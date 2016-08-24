# Bible Metadata

My collection of Bible metadata in the form of CSV files.
Focused on just the data I need for my own hobbies. See sources below
for more extensive Bible metadata.

Chapter and verse counts are based on the KJV.

## Data History

### BookAliases.csv

Initial CSV from [github.com/robertrouse/KJV-bible-database-with-metadata-MetaV-][1].

- Removed a few aliases and added many more.

### Books.csv

Initial CSV from [github.com/robertrouse/KJV-bible-database-with-metadata-MetaV-][1].

- Added `OsisID`.
- Added `TotalChapters`.
- Added `Volume` of either `NT` (New Testament) or `OT` (Old Testament).

### Chapters.csv

Initial CSV from [github.com/robertrouse/KJV-bible-database-with-metadata-MetaV-][1].

- Added `TotalVerses` and `WordCountKjv` calculated from `Verses.csv` in same repository.
- Added `ReadingTimeInSecondsKjvScourby` calculated from the KJV narrated by Alexander Scourby (Voice Only, MP3).

### ProfGrantHorner_Books.csv

Same as `Books.csv` but with an additional `ListID` column that cooresponds to the lists in Professor Grant Horner's Bible Reading System.

### ProfGrantHorner_Lists.csv

Lists and total chapter counts based on Professor Grant Horner's Bible Reading System.

# Codegen

The `./codegen` directory contains generated source code for the above Bible metadata in various languages.

Regenerate those source files by running: `go run codegen.go`

TypeScript output requires `tsc` to be on your PATH. `npm install typescript -g`

# License

Public domain.

[1]: https://github.com/robertrouse/KJV-bible-database-with-metadata-MetaV-
