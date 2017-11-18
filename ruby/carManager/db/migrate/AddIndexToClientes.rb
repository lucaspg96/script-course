class AddIndexToClientes < ActiveRecord::Migration
  def change
    add_index :clientes, :rg, unique: true
    add_index :clientes, :cpf, unique: true
  end
end