class Reserva < ApplicationRecord
	validate :cpf_is_valid
	validate :placa_is_valid
	validate :time_is_valid

	def cpf_is_valid
		cliente = Cliente.get_by_cpf(cpf)
		errors.add(:cpf,"CPF inválido") unless cliente[0]!=nil
	end

	def placa_is_valid
		c = Carro.get_by_placa(carro)
		errors.add(:carro,"Placa inválida") unless c[0]!=nil
	end

	def time_is_valid
		errors.add(:data_inicio, "Data de início é anterior a data atual") unless data_inicio >= Date.today
		errors.add(:data_fim, "Data de início é posterior a data final") unless data_fim >= data_inicio
		reservas = Reserva.where("carro = ? and( 
			(data_inicio <= ? and data_fim >= ?)
			or (data_inicio <= ? and data_fim >= ?)
			or (data_inicio >= ? and data_fim <= ?))",
					carro,data_inicio,data_inicio,data_fim,data_fim,data_inicio,data_fim)

		errors.add(:data_inicio, "Intervalo de tempo não disponível") unless reservas[0]==nil
		errors.add(:data_fim, "Intervalo de tempo não disponível") unless reservas[0]==nil
	end

end
