class Cliente < ApplicationRecord
	validates :name, presence: {message: ": Nome deve ser informado"}

	validates :rg, presence: {message: ": RG deve ser informado"}
	validates :rg, uniqueness: {message: ": RG já cadastrado"}

	validates :cpf, presence: {message: ": CPF deve ser informado"}
	validates :cpf, uniqueness: {message: ": CPF já cadastrado"}

	validates :address, presence: {message: ": Endereço deve ser informado" }

	def self.get_by_cpf(c)
		self.where(cpf: c)
	end

end
