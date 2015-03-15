require 'open-uri'
require 'json'
require "csv"

out = []
CSV.foreach("isbn.csv") do |row|
    url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + row[0]
    book = JSON.parse(open(url, 'Accept-Encoding' => '').read)
    book["tldr"] = row[1]
    out.push(book)
end
puts out.to_json

