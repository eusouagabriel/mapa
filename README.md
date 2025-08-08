# Mapa de Instalações Externas da Gabriel

## Descrição
A página "Gabriel para Autoridades" tem um mapa embebido que mostra a localização de todas as localidades que possuem câmeras externas da Gabriel. O mapa é gerado a partir de um arquivo JSON obtido por consulta ao banco de dados. 

#### Arquivo JSON
Um arquivo com uma lista de lat e longs pode ser obtido através da query abaixo:
```sql
SELECT 
	ST_X(l.`point`) AS "lat",
	ST_Y(l.`point`) AS "lng"
FROM locations_lat.locations l 
INNER JOIN surveillance.cameras_locations cl ON cl.locationId = l.id  AND cl.active  
INNER JOIN surveillance.cameras c ON c.id = cl.cameraId 
INNER JOIN surveillance.camera_types ct ON ct.id = c.typeId 
WHERE l.active 
AND l.enabled 
AND c.enabled 
AND ct.name = "External" 
AND NOT l.isSuspended 
AND ST_X(l.`point`) > -30 AND  ST_Y(l.`point`) < -30
GROUP BY l.id
```
Com esta query os lat e longs são obtidos na ordem correta, ou seja, em um formato que pode ser usado diretamente no mapa.

## Demonstração
Este projeto é exposto automaticamente no endereço https://eusouagabriel.github.io/mapa. Um parâmetro query pode ser usado para mudar a posição inicial do mapa:
- SP: https://eusouagabriel.github.io/mapa/?place=sp
- RJ: https://eusouagabriel.github.io/mapa/?place=rj
- Niterói: https://eusouagabriel.github.io/mapa/?place=nit

Aqui usamos GitHub Pages para hospedar o mapa e GitHub Actions para atualizar o mapa automaticamente a cada push no repositório.

#### Notas
Sempre há uma confusão que inverte as coordenadas de latitude e longitude. Caso as coordenadas estejam invertidas, o script em `/utils/json-fixer.py` pode ser usado para corrigir isso.
