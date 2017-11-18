json.extract! carro, :id, :placa, :tipo, :ano, :created_at, :updated_at
json.url carro_url(carro, format: :json)
