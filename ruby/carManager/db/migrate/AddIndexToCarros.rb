class AddIndexToCarros < ActiveRecord::Migration
  def change
    add_index :carros, :placa, unique: true
  end
end