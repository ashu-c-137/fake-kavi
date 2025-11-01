import { useState } from 'react';
import { WordBottomSheet } from './WordBottomSheet';
import { findWord, type WordEntry } from '../data/dictionary';

interface ClickablePoemContentProps {
  content: string;
  isRoman: boolean;
}

export function ClickablePoemContent({ content, isRoman }: ClickablePoemContentProps) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [wordDetails, setWordDetails] = useState<WordEntry | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleWordClick = (word: string) => {
    // Clean the word: remove punctuation
    const cleanedWord = isRoman
      ? word.replace(/[^\w]/g, '').toLowerCase()  // Remove non-word chars for Roman, lowercase
      : word.replace(/[^\u0900-\u097F]/g, ''); // Keep only Devanagari for Hindi
    
    if (!cleanedWord || cleanedWord.length < 1) return;

    const details = findWord(cleanedWord, isRoman);
    setSelectedWord(word);
    setWordDetails(details);
    setIsSheetOpen(true);
  };

  // Split content into words and render them
  const renderContent = () => {
    const lines = content.split('\n');
    
    return lines.map((line, lineIndex) => {
      if (!line.trim()) {
        return <br key={lineIndex} className="mb-2" />;
      }

      // For Roman: split by whitespace but preserve it
      // For Hindi: match Devanagari sequences, punctuation, and whitespace separately
      const parts: Array<{ text: string; isWord: boolean }> = [];
      
      if (isRoman) {
        // Roman script: split by whitespace
        const tokens = line.split(/(\s+)/);
        tokens.forEach(token => {
          if (/^\s+$/.test(token)) {
            parts.push({ text: token, isWord: false });
          } else if (/[\w]+/.test(token)) {
            parts.push({ text: token, isWord: true });
          } else {
            parts.push({ text: token, isWord: false });
          }
        });
      } else {
        // Hindi: match Devanagari words (with matras, conjuncts, etc.)
        const regex = /([\u0900-\u097F]+)|([^\u0900-\u097F]+)/g;
        let match;
        while ((match = regex.exec(line)) !== null) {
          if (match[1]) {
            // Devanagari sequence - this is a word
            parts.push({ text: match[1], isWord: true });
          } else if (match[2]) {
            // Non-Devanagari (punctuation, spaces, etc.)
            parts.push({ text: match[2], isWord: false });
          }
        }
      }

      return (
        <div key={lineIndex} className="mb-1">
          {parts.map((part, partIndex) => {
            if (!part.isWord) {
              return <span key={partIndex}>{part.text}</span>;
            }

            return (
              <span
                key={partIndex}
                onClick={() => handleWordClick(part.text)}
                className="cursor-pointer hover:bg-rose-100 hover:text-rose-900 px-1 rounded transition-colors active:bg-rose-200 inline-block"
                title="Click for meaning"
              >
                {part.text}
              </span>
            );
          })}
          {lineIndex < lines.length - 1 && <br />}
        </div>
      );
    });
  };

  return (
    <>
      <div className="select-none">{renderContent()}</div>
      <WordBottomSheet
        word={selectedWord || ''}
        details={wordDetails}
        isOpen={isSheetOpen}
        onClose={() => {
          setIsSheetOpen(false);
          setSelectedWord(null);
          setWordDetails(null);
        }}
      />
    </>
  );
}

