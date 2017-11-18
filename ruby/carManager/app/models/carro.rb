class Carro < ApplicationRecord
	validates :placa, presence: {message: ": Placa deve ser informada"}
	validates :placa, uniqueness: {message: ": Placa já cadastrada"}
	validates :tipo, presence: {message: ": Tipo deve ser informado" }
	validates :ano, presence: {message: ": Ano deve ser informado"}

	def self.get_by_placa(x)
		puts "X: "+x
		self.where(placa: x)
	end
end
