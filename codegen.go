package main

import (
	"bufio"
	"encoding/csv"
	"io"
	"log"
	"os"
	"strconv"
	"text/template"
)

func main() {
	genBooks()
}

type book struct {
	ID       int8
	OsisID   string
	Name     string
	Chapters int8
}

func getBooks() []book {
	var books []book

	f, err := os.Open("Books.csv")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	r := csv.NewReader(bufio.NewReader(f))
	r.Read() // skip the header row
	for {
		record, err := r.Read()
		if err == io.EOF {
			break
		}

		id, _ := strconv.ParseInt(record[0], 10, 8)
		chapters, _ := strconv.ParseInt(record[3], 10, 8)

		books = append(books, book{
			ID:       int8(id),
			OsisID:   record[1],
			Name:     record[2],
			Chapters: int8(chapters),
		})
	}

	return books
}

func genBooks() {

	books := getBooks()

	tmpl, err := template.New("").Parse(`
var Book = (function () {
    function Book(id, osisID, name, chapters) {
        this.id = id;
        this.osisID = osisID;
        this.name = name;
        this.chapters = chapters;
    }
    Book.all = function () {
        return [
            {{ range . -}}
            new Book({{.ID}}, "{{.OsisID}}", "{{.Name}}", {{.Chapters}}),
            {{ end -}}
        ];
    };
    return Book;
}());
`)
	if err != nil {
		log.Fatal(err)
	}

	f, err := os.Create("codegen/js/books.js")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()
	tmpl.Execute(f, books)
}
