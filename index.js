// Function to handle the redaction process
function redactText() {
    const startTime = performance.now() // Start measuring performance time

    // Retrieve the original text, words to redact, and replacement text from input fields
    const originalText = document.getElementById('original-text').value
    const redactWords = document.getElementById('wordsToRedact').value.trim().split(' ').filter(Boolean) // Remove empty strings
    const replacementText = document.getElementById('replacementText').value || '****'

    // Check for empty fields
    if (!originalText || redactWords.length === 0) {
        alert('Please enter the original text and words to redact.')
        return
    }

    if (!redactWords) {
        alert('Please enter the words to redact.')
        return
    }

    let redactedText = originalText // Initialize redacted text with original text
    let wordsScanned = 0 // Initialize word count
    let matchedWords = 0 // Initialize matched word count
    let charactersScrambled = 0 // Initialize scrambled character count

    // Loop through each word to redact
    redactWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi') // Create regex pattern for current word
        const matches = redactedText.match(regex) // Find matches for the current word

        if (matches) {
            matchedWords += matches.length // Update matched word count
            charactersScrambled += matches.join('').length // Update scrambled character count
        }

        redactedText = redactedText.replace(regex, replacementText) // Replace the matched word with replacement text
    })

    wordsScanned = originalText.split(/\s+/).length // Count the number of words in the original text

    const endTime = performance.now() // End measuring performance time
    const elapsedTime = ((endTime - startTime) / 1000).toFixed(2) // Calculate elapsed time in seconds

    // Display the redacted text in the output div
    document.getElementById('redactedOutput').innerText = redactedText

    // Generate statistics
    const stats = `
        Words Scanned: ${wordsScanned}
        Matched Words: ${matchedWords}
        Characters Scrambled: ${charactersScrambled}
        Time Taken: ${elapsedTime} seconds
    `

    // Display statistics in the stats div
    document.getElementById('stats').innerText = stats
}

// Function to reset all input fields and output
function resetFields() {
    // Clear the input fields
    document.getElementById('original-text').value = ''
    document.getElementById('wordsToRedact').value = ''
    document.getElementById('replacementText').value = ''
    
    // Clear the stats and redacted output
    document.getElementById('stats').innerText = ''
    document.getElementById('redactedOutput').innerText = ''
}
