#!/bin/bash
echo "updating books.json..."
ruby generate.rb > books.json
echo "done."
