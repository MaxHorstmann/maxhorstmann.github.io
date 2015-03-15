require 'open-uri'
require 'json'
require "csv"

puts "["
first = false;
CSV.foreach("isbn.csv") do |row|
    isbn = row[0]
    tldr = row[1]

    url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn
    json = open(url, 'Accept-Encoding' => '').read
    if first then
        first = false
    else
        puts ","
    end
    puts json
    #volumeInfo = JSON.parse(json)["items"][0]["volumeInfo"];
    #title = volumeInfo["title"] 
    #subtitle = volumeInfo["subtitle"] 
    #authors = volumeInfo["authors"].join()
    #thumbnail = volumeInfo["imageLinks"]["smallThumbnail"] 
    #puts "\"#{title}\";\"#{subtitle}\";\"#{authors}\";\"#{thumbnail}\""

end

puts "]"

