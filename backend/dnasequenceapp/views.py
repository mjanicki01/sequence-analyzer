from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views import View

import json

from Bio.SeqIO import parse


def search_proteins(target_sequence):
    matching_proteins = []
    fasta_file = "dnasequenceapp/proteins/collection.fasta"

    for record in parse(fasta_file, "fasta"):
        if target_sequence in str(record.seq):
            matching_proteins.append(record)

    return matching_proteins


@method_decorator(csrf_exempt, name='dispatch')
class SequenceAnalysisViewset(View):
    
    def post(self, request, *args, **kwargs):
        input_sequence = json.loads(request.body.decode('utf-8')).get('sequence', '')

        if input_sequence:
            try:
                protein_result = search_proteins(input_sequence)
                return JsonResponse({'result': str(protein_result)})
                # return Response({
                #     'match': match,
                #     'alignment': alignment
                # })
            
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=400)
            
        return JsonResponse({'error': 'Invalid Request'}, status=400)