# Bible Metadata

My collection of Bible metadata in the form of CSV files.
Focused on basic book, chapter, and verse numbers. See sources below
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

### Chapters.csv

Initial CSV from [github.com/robertrouse/KJV-bible-database-with-metadata-MetaV-][1].

- Added `TotalVerses` and `WordCountKjv` calculated from `Verses.csv` in same repository.
- Added `ReadingTimeInSecondsKjvScourby` calculated from the KJV narrated by Alexander Scourby (Voice Only, MP3). 

# License

Public domain.

[1]: https://github.com/robertrouse/KJV-bible-database-with-metadata-MetaV-
