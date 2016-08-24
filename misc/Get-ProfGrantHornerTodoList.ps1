<#
.SYNOPSIS
    Generates a plain text "todo list" Bible reading list based on
    the Prof. Grant Horner reading system.

.PARAMETER Days
    Number of days to generate todo list items for.

.PARAMETER Format
    Format string for the todo list items to output.
    Available placeholders: {Book}, {Chapter}, and {List}

.NOTES
    Author: Joshua Poehls
#>
param(
    $Days = 7,
    $Format = "{Book} {Chapter} (List {List})"
)

Set-StrictMode -Version Latest
$scriptPath = Split-Path -LiteralPath $(if ($PSVersionTable.PSVersion.Major -ge 30) { $PSCommandPath } else { & { $MyInvocation.ScriptName } })

# This is where your bookmarks are current at and
# will be the first day in the generated output.
$bookmarks = @(
    parseRef -ListID  1 -Ref 'Matt 1'
    parseRef -ListID  2 -Ref 'Gen 1'
    parseRef -ListID  3 -Ref 'Rom 1'
    parseRef -ListID  4 -Ref '1Thess 1'
    parseRef -ListID  5 -Ref 'Job 1'
    parseRef -ListID  6 -Ref 'Ps 1'
    parseRef -ListID  7 -Ref 'Prov 1'
    parseRef -ListID  8 -Ref 'Josh 1'
    parseRef -ListID  9 -Ref 'Isa 1'
    parseRef -ListID 10 -Ref 'Acts 1'
)

$bookAliases = Import-Csv (Join-Path $scriptPath ..\BookAliases.csv)
$books = Import-Csv (Join-Path $scriptPath ..\Books.csv)
$booksByList = Import-Csv (Join-Path $scriptPath ..\ProfGrantHorner.csv)

function parseRef {
param([int]$ListID, [string]$Ref)

    $Ref = $Ref.Trim()
    if ($ref.Contains(' ')) {
        $bookInput = $Ref.Substring(0, $Ref.IndexOf(' '))
        $chapterInput = [int]$Ref.Substring($Ref.IndexOf(' ')).Trim()
    } else {
        $bookInput = $Ref
        $chapterInput = 1
    }

    $bookID = $bookAliases | Where-Object { $_.Alias -eq $bookInput } | Select-Object -First 1 -ExpandProperty BookID
    if (!$bookID) {
        throw "Invalid book name.`n Input: $bookInput"
    }
    
    $book = $books | Where-Object { $_.BookID -eq $bookID } | Select-Object -First 1
    if ($chapterInput -gt $book.TotalChapters) {
        throw "Invalid chapter.`nInput: $chapterInput`nBook: $($book.BookName)`nTotal Chapters: $($book.TotalChapters)"
    }

    $bookListID = $booksByList | Where-Object { $_.BookID -eq $bookID } | Select-Object -First 1 -ExpandProperty ListID
    if ($bookListID -ne $ListID) {
        throw "Book is not in specified list.`nList: $ListID`nBook: $($book.BookName)`nActual List: $bookListID"
    }

    $bookIDsInList = $booksByList | Where-Object { $_.ListID -eq $ListID } | Select-Object -ExpandProperty BookID
    
    @{
        ListID = $ListID
        Book = $book
        Chapter = $chapterInput
        Range = $books | Where-Object { $bookIDsInList -contains $_.BookID }
    }
}

function bumpBookmarks {
    $bookmarks | ForEach-Object {
        if ($_.Chapter -eq $_.Book.TotalChapters) {
            $currBookID = $_.Book.BookID
            $nextBook = $_.Range | Sort-Object -Property BookID -Descending | Where-Object { $_.BookID -ge $currBookID } | Select-Object -First 1
            $_.Book = $nextBook
            $_.Chapter = 1
        } else {
            $_.Chapter += 1
        }
    }
}

$daycounter = 1

while ($daycounter -le $Days)
{
    $bookmarks | ForEach-Object {
        $item = $Format -replace "{Book}", $_.Book.OsisID
        $item = $item -replace "{Chapter}", $_.Chapter
        $item = $item -replace "{List}", $_.ListID
        Write-Output $item
    }

    $daycounter++
    bumpBookmarks
}