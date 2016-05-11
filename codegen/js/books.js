var bibleMetadata;
(function (bibleMetadata) {
    var Book = (function () {
        function Book(id, osisId, name, chapters) {
            this.id = id;
            this.osisId = osisId;
            this.name = name;
            this.chapters = chapters;
        }
        return Book;
    }());
    function allBooks() {
        return [
            new Book(1, "Gen", "Genesis", 50),
            new Book(1, "Gen", "Genesis", 50),
            new Book(2, "Exod", "Exodus", 40),
            new Book(3, "Lev", "Leviticus", 27),
            new Book(4, "Num", "Numbers", 36),
            new Book(5, "Deut", "Deuteronomy", 34),
            new Book(6, "Josh", "Joshua", 24),
            new Book(7, "Judg", "Judges", 21),
            new Book(8, "Ruth", "Ruth", 4),
            new Book(9, "1Sam", "1 Samuel", 31),
            new Book(10, "2Sam", "2 Samuel", 24),
            new Book(11, "1Kgs", "1 Kings", 22),
            new Book(12, "2Kgs", "2 Kings", 25),
            new Book(13, "1Chr", "1 Chronicles", 29),
            new Book(14, "2Chr", "2 Chronicles", 36),
            new Book(15, "Ezra", "Ezra", 10),
            new Book(16, "Neh", "Nehemiah", 13),
            new Book(17, "Esth", "Esther", 10),
            new Book(18, "Job", "Job", 42),
            new Book(19, "Ps", "Psalms", 127),
            new Book(20, "Prov", "Proverbs", 31),
            new Book(21, "Eccl", "Ecclesiastes", 12),
            new Book(22, "Song", "Song of Solomon", 8),
            new Book(23, "Isa", "Isaiah", 66),
            new Book(24, "Jer", "Jeremiah", 52),
            new Book(25, "Lam", "Lamentations", 5),
            new Book(26, "Ezek", "Ezekiel", 48),
            new Book(27, "Dan", "Daniel", 12),
            new Book(28, "Hos", "Hosea", 14),
            new Book(29, "Joel", "Joel", 3),
            new Book(30, "Amos", "Amos", 9),
            new Book(31, "Obad", "Obadiah", 1),
            new Book(32, "Jonah", "Jonah", 4),
            new Book(33, "Mic", "Micah", 7),
            new Book(34, "Nah", "Nahum", 3),
            new Book(35, "Hab", "Habakkuk", 3),
            new Book(36, "Zeph", "Zephaniah", 3),
            new Book(37, "Hag", "Haggai", 2),
            new Book(38, "Zech", "Zechariah", 14),
            new Book(39, "Mal", "Malachi", 4),
            new Book(40, "Matt", "Matthew", 28),
            new Book(41, "Mark", "Mark", 16),
            new Book(42, "Luke", "Luke", 24),
            new Book(43, "John", "John", 21),
            new Book(44, "Acts", "Acts", 28),
            new Book(45, "Rom", "Romans", 16),
            new Book(46, "1Cor", "1 Corinthians", 16),
            new Book(47, "2Cor", "2 Corinthians", 13),
            new Book(48, "Gal", "Galatians", 6),
            new Book(49, "Eph", "Ephesians", 6),
            new Book(50, "Phil", "Philippians", 4),
            new Book(51, "Col", "Colossians", 4),
            new Book(52, "1Thess", "1 Thessalonians", 5),
            new Book(53, "2Thess", "2 Thessalonians", 3),
            new Book(54, "1Tim", "1 Timothy", 6),
            new Book(55, "2Tim", "2 Timothy", 4),
            new Book(56, "Titus", "Titus", 3),
            new Book(57, "Phim", "Philemon", 1),
            new Book(58, "Heb", "Hebrews", 13),
            new Book(59, "Jas", "James", 5),
            new Book(60, "1Pet", "1 Peter", 5),
            new Book(61, "2Pet", "2 Peter", 3),
            new Book(62, "1John", "1 John", 5),
            new Book(63, "2John", "2 John", 1),
            new Book(64, "3John", "3 John", 1),
            new Book(65, "Jude", "Jude", 1),
            new Book(66, "Rev", "Revelation", 22),
        ];
    }
    bibleMetadata.allBooks = allBooks;
})(bibleMetadata || (bibleMetadata = {}));
