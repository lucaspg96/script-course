class CreateCarros < ActiveRecord::Migration[5.1]
  def change
    create_table :carros do |t|
      t.string :placa
      t.integer :tipo
      t.integer :ano

      t.timestamps
    end
  end
end
