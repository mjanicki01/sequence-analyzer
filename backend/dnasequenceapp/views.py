from django.contrib.auth import logout
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

import json

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from .serializers import UserSerializer
from .models import SearchHistory

from Bio.SeqIO import parse


def match_protein_sequence(target_sequence, sequence_str):
    match_positions = []
    start_index = 0

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

    return match_positions


def search_proteins(target_sequence):
    matching_proteins = []
    fasta_file = "dnasequenceapp/protein-collection.fasta"

    for record in parse(fasta_file, "fasta"):
        sequence_str = str(record.seq)
        match_positions = match_protein_sequence(target_sequence, sequence_str)

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
class SequenceAnalysisViewset(APIView):

    def post(self, request, *args, **kwargs):
        input_sequence = request.data.get("query", "")

        if input_sequence:
            protein_result = search_proteins(input_sequence)

            if request.user.is_authenticated:
                SearchHistory.objects.create(
                    user=request.user,
                    query=input_sequence,
                    results=json.dumps(protein_result),
                )
            try:
                return JsonResponse(
                    {"query": input_sequence, "results": protein_result}
                )

            except Exception as e:
                return JsonResponse({"error": str(e)}, status=400)

        return JsonResponse({"error": "Invalid Request"}, status=400)


class CreateUserViewset(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token, _ = Token.objects.get_or_create(user=user)

                # Store search history if provided
                search_history = request.data.get("search_history", [])
                for item in search_history:
                    SearchHistory.objects.create(
                        user=user,
                        query=item["query"],
                        results=json.dumps(item["results"]),
                    )

                return Response(
                    {"token": token.key, "username": user.username},
                    status=status.HTTP_201_CREATED,
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomAuthViewset(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, _ = Token.objects.get_or_create(user=user)

        search_history_qs = SearchHistory.objects.filter(user=user).values(
            "query", "results", "timestamp"
        )

        # Manually parse the results from string to JSON for each item
        search_history = []
        for item in search_history_qs:
            parsed_results = json.loads(item["results"]) if item["results"] else []
            item["results"] = parsed_results
            search_history.append(item)

        # Include user's search history in the response
        return Response(
            {
                "token": token.key,
                "username": user.username,
                "search_history": search_history,
            }
        )


class LogoutViewset(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
