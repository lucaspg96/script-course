class CreateClientes < ActiveRecord::Migration[5.1]
  def change
    create_table :clientes do |t|
      t.string :name
      t.string :address
      t.string :cpf
      t.string :rg

      t.timestamps
    end
  end
end
