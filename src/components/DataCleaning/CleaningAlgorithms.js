const DateFormats=[
  {
    label: "dd/MM/yyyy",
    value: "%d/%m/%Y"
  },
  {
    label: "dd-MM-yyyy",
    value: "%d-%m-%Y"
  },
  {
    label: "dd-MMM-yyyy",
    value: "%d-%b-%Y"
  },
  {
    label: "MM/dd/yyyy",
    value: "%m/%d/%Y"
  },
  {
    label: "MM-dd-yyyy",
    value: "%m-%d-%Y"
  },
  {
    label: "MMM-dd-yyyy",
    value: "%b-%d-%Y"
  },
  {
    label: "yyyy/MM/dd",
    value: "%Y/%m/%d"
  },
  {
    label: "yyyy-MM-dd",
    value: "%Y-%m-%d"
  },
  {
    label: "yyyy-MMM-dd",
    value: "%Y-%b-%d"
  },
  {
    label: "dd-MMMM-yyyy",
    value: "%d-%B-%y"
  },
  {
    label: "yyyy-MM-dd HH:mm:ss",
    value: "%Y-%m-%d %H:%M:%S"
  },
]

const DateFormatting = {
  label: "Date Formatting",
  value: "dateFormatting",
  Type: "date",
};

const ReplaceColumnValue = {
  label: "Replace Values",
  value: "replaceColumnValue",
};

const FillingMissingValues = [
  {
    label: "Fill Values with Mode",
    value: "fillWithMode",
    Type: "all",
  },
  {
    label: "Fill Values with Mean",
    value: "fillWithMean",
    Type: "numerical",
  },
  {
    label: "Fill Values with Median",
    value: "fillWithMedian",
    Type: "numerical",
  },
  {
    label: "Fill Values with Interpolation",
    value: "fillWithInterpolation",
    Type: "numerical",
  },
];

const CategoricalAlgoritms = [
  ReplaceColumnValue,
  {
    label: "Fill Values with Mode",
    value: "fillWithMode",
    Type: "all",
  },
  DateFormatting
];

const NumericAlgoritms = [...FillingMissingValues, ReplaceColumnValue];

const CleaningAlgorithms = [...FillingMissingValues, ReplaceColumnValue, DateFormatting]

const FuzzyAlgorithms = [
  {
    label: "Levenshtein Distance",
    value: "ratio",
    Note: "Levenshtein distance between two words is the minimum number of single-character edits (i.e. insertions, deletions or substitutions) required to change one word into the other.",
  },
  {
    label: "Cosine",
    value: "token_sort_ratio",
    Note: "The cosine similarity ranges from 0 to 1, where 0 means the strings are orthogonal (have nothing in common) and 1 means they are identical (have the same direction).",
  },
  {
    label: "Jaccard",
    value: "token_set_ratio",
    Note: "Jaccard Similarity first finds the total number of observations in both sets, then divide the total number of observations in either set",
  },
  {
    label: "Jaro Winkler",
    value: "jaro_winkler",
    Note: "The Jaro measure is the weighted sum of percentage of matched characters from each file and transposed characters. Winkler increased this measure for matching initial characters, then rescaled it by a piecewise function, whose intervals and weights depend on the type of string.",
  },
  {
    label: "Soundex",
    value: "soundex",
    Note: "The Soundex algorithms convert an alphanumeric character string into code. These characters are based on their own phonetics, that is, on the way they are spoken, rather than written.",
  },
];

export {
  NumericAlgoritms,
  CategoricalAlgoritms,
  DateFormatting,
  FuzzyAlgorithms,
  CleaningAlgorithms,
  DateFormats
};

