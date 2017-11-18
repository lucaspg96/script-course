json.extract! cliente, :id, :name, :address, :cpf, :rg, :created_at, :updated_at
json.url cliente_url(cliente, format: :json)
