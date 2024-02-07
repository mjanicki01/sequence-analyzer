from django.contrib.auth.models import User
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views import View

import json

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from .serializers import UserSerializer

from Bio.SeqIO import parse


def search_proteins(target_sequence):
    matching_proteins = []
    fasta_file = "dnasequenceapp/protein-collection.fasta"

    for record in parse(fasta_file, "fasta"):
        sequence_str = str(record.seq)
        start_index = 0
        match_positions = []

        while True:
            # Find the target sequence starting from the current search position
            start_index = sequence_str.find(target_sequence, start_index)

            if start_index == -1:
                break
            else:
                # Adjust for 1-based indexing
                start_index_1_based = start_index + 1
                end_index_1_based = start_index + len(
                    target_sequence
                )  # No need to subtract 1 before appending
                match_positions.append(f"{start_index_1_based} - {end_index_1_based}")
                start_index += 1

        if match_positions:
            matching_proteins.append(
                {
                    "name": " ".join(record.description.split(" ")[1:]),
                    "id": record.id,
                    "match_indices": ", ".join(match_positions),
                }
            )

    return matching_proteins


@method_decorator(csrf_exempt, name="dispatch")
class SequenceAnalysisViewset(View):

    def post(self, request, *args, **kwargs):
        input_sequence = json.loads(request.body.decode("utf-8")).get(
            "inputSequence", ""
        )

        if input_sequence:
            try:
                protein_result = search_proteins(input_sequence)
                return JsonResponse({"result": str(protein_result)})

            except Exception as e:
                return JsonResponse({"error": str(e)}, status=400)

        return JsonResponse({"error": "Invalid Request"}, status=400)


class CreateUserViewset(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.get_or_create(user=user)
                return Response({"token": token}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ExampleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        content = {"message": "Hello, World!"}
        return Response(content)
