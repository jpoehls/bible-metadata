package main

import (
	"bufio"
	"encoding/csv"
	"io"
	"log"
	"os"
	"os/exec"
	"strconv"
	"text/template"
)

func main() {
	genBooksJS()
	genBooksTS()
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

func genBooksJS() {
	
	cmd := exec.Command("tsc", "-p", "codegen/ts")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	
	err := cmd.Run()
	if err != nil {
		panic(err)
	}
}

func genBooksTS() {
	
	books := getBooks()

	tmpl, err := template.New("").Parse(`module bibleMetadata {
      class Book {
            id: number;
            osisId: string;
            name: string;
            chapters: number;

            constructor(id: number, osisId: string, name: string, chapters: number) {
                  this.id = id;
                  this.osisId = osisId;
                  this.name = name;
                  this.chapters = chapters;
            }
      }

      export function allBooks(): Book[] {
            return [
				  {{ range . -}}
				  new Book({{.ID}}, "{{.OsisID}}", "{{.Name}}", {{.Chapters}}),
				  {{ end -}}
            ];
      }
}
`)
	if err != nil {
		log.Fatal(err)
	}

	f, err := os.Create("codegen/ts/books.ts")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()
	tmpl.Execute(f, books)
}