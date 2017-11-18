class CreateReservas < ActiveRecord::Migration[5.1]
  def change
    create_table :reservas do |t|
      t.string :carro
      t.string :cliente
      t.string :cpf
      t.datetime :data_inicio
      t.datetime :data_fim

      t.timestamps
    end
  end
end
