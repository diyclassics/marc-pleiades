import sys
import csv
import json

def convert_csv_to_json():
    csvfile = open(sys.argv[1], 'r')
    jsonfile = open('books.json', 'w')

    fieldnames = ('date', 'precision_code', 'precision', 'region', 'location', 'pleiades_name', 'pleiades_id', 'lat', 'lng', 'title', 'imprint', 'series', 'shelf_location', 'bsn')
    reader = csv.DictReader(csvfile, fieldnames)
    for row in reader:
        json.dump(row, jsonfile)
        jsonfile.write('\n')


if __name__ == '__main__':
  convert_csv_to_json()
