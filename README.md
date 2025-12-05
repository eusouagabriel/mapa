# Mapa de Instalações Externas da Gabriel

## Descrição

O site da Gabriel tem um mapa embebido que mostra a localização de todos os CamaleÕes. O mapa é gerado a partir do arquivo `locations.fixed.json`, que é atualizado automaticamente via workflow no n8n.

## Atualização Automática

O arquivo `locations.fixed.json` é atualizado diariamente por um workflow no n8n que:

1. **Autentica** na API Bifrost
2. **Busca** todos os dispositivos via API com paginação automática (páginas de 1000 itens)
3. **Transforma** os dados para o formato `[{lat, lng}, ...]`
4. **Commita** direto neste repositório via API do GitHub
5. **Notifica** via Slack quando concluído

O workflow roda automaticamente e não requer intervenção manual.

## Demonstração

Este projeto é exposto automaticamente no endereço https://eusouagabriel.github.io/mapa. 

Um parâmetro query pode ser usado para mudar a posição inicial do mapa:

- São Paulo: https://eusouagabriel.github.io/mapa/?place=sp
- Rio de Janeiro: https://eusouagabriel.github.io/mapa/?place=rj
- Niterói: https://eusouagabriel.github.io/mapa/?place=nit
- Belo Horizonte: https://eusouagabriel.github.io/mapa/?place=bh

O mapa é hospedado via GitHub Pages e atualizado automaticamente a cada push no repositório.

## Formato do Arquivo

O `locations.fixed.json` contém um array de coordenadas:
```json
[
  {"lat": -23.49173752242143, "lng": -46.61910742521286},
  {"lat": -22.98670288734682, "lng": -43.20114639275156},
  ...
]
```

## Notas

- O script em `/utils/json-fixer.py` pode ser usado para corrigir inversão de lat/lng se necessário
- O workflow n8n está configurado no ambiente cloud da Gabriel
- Em caso de falha no workflow, não haverá notificação no Slack — ausência de mensagem indica problema
