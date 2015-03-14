require 'net/http'
require 'net/https'


json = Net::HTTP.get(URI.parse('https://www.googleapis.com/books/v1/volumes?q=isbn:9780984999309'))
puts json