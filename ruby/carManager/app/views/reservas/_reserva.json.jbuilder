json.extract! reserva, :id, :carro, :cliente, :cpf, :data_inicio, :data_fim, :created_at, :updated_at
json.url reserva_url(reserva, format: :json)
