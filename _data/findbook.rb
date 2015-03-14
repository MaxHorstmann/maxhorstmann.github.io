require 'open-uri'
require 'json'

isbn = ARGV[0]

if (isbn.to_s == '') 
    puts "usage: ruby findbook.rb <isbn>" 
else
    url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn
    json = open(url, 'Accept-Encoding' => '').read
    volumeInfo = JSON.parse(json)["items"][0]["volumeInfo"];
    title = volumeInfo["title"] 
    subtitle = volumeInfo["subtitle"] 
    authors = volumeInfo["authors"].join()
    thumbnail = volumeInfo["imageLinks"]["smallThumbnail"] 
    puts "\"#{title}\";\"#{subtitle}\";\"#{authors}\";\"#{thumbnail}\""
end


