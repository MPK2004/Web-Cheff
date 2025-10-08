'use client';
import { useState, useRef, useEffect } from 'react';

// --- Helper Components (Keep all your SVG components as they were) ---

const SendIcon = () => ( <svg width="24" height="24" viewBox="0 0 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2 .01 7z" fill="currentColor"/></svg> );
const UserIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> );
const BotIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 8V4H8" /><rect x="4" y="12" width="16" height="8" rx="2" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="M12 18v2" /><path d="M12 12v-2" /></svg> );
const SparklesIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9a9 9 0 1 1-9-9Z"/></svg> );
const MicrophoneIcon = ({ isListening }) => ( <svg width="24" height="24" viewBox="0 0 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={isListening ? 'text-red-500 animate-pulse' : 'text-gray-400'}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="currentColor"/><path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2z" fill="currentColor"/></svg> );
const UploadIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg> );
const DownloadIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg> );
const AccessibilityIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" /><path d="M12 4v4m0 8v4M4 12h4m8 0h4" /></svg> );
const PaletteIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg> );
const FeedbackIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg> );
const SeoIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10H7z" /><path d="M12 17V7" /><path d="M15 12H9" /></svg> );
const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;

const SuggestionModal = ({ isOpen, onClose, suggestions, onApply }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => { if (isOpen) setCurrentIndex(0); }, [isOpen]);
    if (!isOpen) return null;
    const handleNext = () => setCurrentIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    const handlePrev = () => setCurrentIndex(prev => Math.max(prev - 1, 0));
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity">
            <div className="bg-[#0d1117] rounded-lg shadow-xl w-11/12 h-5/6 flex flex-col p-4 border border-gray-700">
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h3 className="text-lg font-bold">Suggested Improvements</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
                </div>
                {suggestions.length > 0 ? (
                    <div className="flex-1 flex flex-col min-h-0">
                        <div className="flex-1 relative bg-white rounded-md mb-4">
                            <iframe srcDoc={suggestions[currentIndex]} title="Suggestion Preview" className="w-full h-full border-none rounded-md" sandbox="allow-scripts" />
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <button onClick={handlePrev} disabled={currentIndex === 0} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50"><ChevronLeftIcon /></button>
                            <span className="text-sm font-mono">{currentIndex + 1} / {suggestions.length}</span>
                            <button onClick={handleNext} disabled={currentIndex === suggestions.length - 1} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50"><ChevronRightIcon /></button>
                        </div>
                        <button onClick={() => onApply(suggestions[currentIndex])} className="mt-4 w-full bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded-lg">Apply This Version</button>
                    </div>
                ) : <div className="flex-1 flex items-center justify-center"><p>No suggestions available.</p></div>}
            </div>
        </div>
    );
};

// --- Main Application ---
export default function Home() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: "Hello! I'm your AI design and copy assistant. Describe a website, or ask me to write some content!" }]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const initialHtml = '<div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">Your website preview will appear here.</div>';
  const [generatedHtml, setGeneratedHtml] = useState(initialHtml);
  const [isListening, setIsListening] = useState(false);
  const [isSpeechApiAvailable, setIsSpeechApiAvailable] = useState(false);
  const [suggestionModalOpen, setSuggestionModalOpen] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState([]);
  const [personaMenuOpen, setPersonaMenuOpen] = useState(false);
  const [lastGeneratedCopy, setLastGeneratedCopy] = useState(null);
  
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);
  const personaMenuRef = useRef(null); // Ref for the persona menu

  // --- API Call Functions (now calling our own server) ---
  const callGeminiAPI = async (contents, responseMimeType = "application/json") => {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents, responseMimeType }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "An unknown error occurred with the Gemini API.");
    if (!data.candidates || data.candidates.length === 0) {
      const blockReason = data.promptFeedback?.blockReason;
      if (blockReason) throw new Error(`Request was blocked by Gemini: ${blockReason}.`);
      throw new Error("The Gemini API returned no content.");
    }
    return data.candidates[0].content.parts[0].text;
  };
  
  const callCohereAPI = async (prompt) => {
    const response = await fetch('/api/cohere', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "An unknown error occurred with the Cohere API.");
    return data.generations[0].text.trim();
  };

  // --- Main Handler Functions ---
  const handleSend = async () => {
    if (!userInput.trim() || isLoading) return;
    setIsLoading(true);
    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    const currentInput = userInput;
    setUserInput('');

    try {
        const intentPrompt = `Does the following user request ask for a visual design or code change (like "make a button" or "change the color"), or is it asking to generate text content (like "write a headline" or "create a product description")? Respond with only the word "DESIGN" or "COPY".\n\nUser request: "${currentInput}"`;
        const intent = await callGeminiAPI([{ parts: [{ text: intentPrompt }] }], "text/plain");

        if (intent.includes("DESIGN")) {
            let contextPrompt = `**Context:** ${generatedHtml === initialHtml ? 'This is the initial request.' : `This is a modification request. Current HTML:\n\`\`\`html\n${generatedHtml}\n\`\`\``}`;
            if (lastGeneratedCopy) contextPrompt += `\n\n**Recently Generated Copy (for context):** The user was just given the following text: "${lastGeneratedCopy}". If their request refers to "that text," "the copy," "it," etc., you should use this text in your response.`;
            const systemPrompt = `You are an expert web developer specializing in Tailwind CSS. Your task is to generate a primary HTML version of a webpage and 3 improved variations based on a user's request. **Rules:** 1. Generate a "main_code" and 3 "suggestions". 2. Use placeholder images from placehold.co. 3. Your entire response must be a single, valid JSON object with keys "main_code" (string of HTML) and "suggestions" (array of 3 HTML strings). ${contextPrompt} **User's Request:** "${currentInput}"`;
            
            const responseText = await callGeminiAPI([{ parts: [{ text: systemPrompt }] }]);
            let parsedJson;
            try {
              parsedJson = JSON.parse(responseText);
            } catch (error) {
              console.error("Failed to parse DESIGN JSON:", responseText);
              throw new Error("The AI's response for the design was not in the expected format. Please try rephrasing your request.");
            }

            if (parsedJson.main_code && parsedJson.suggestions) {
                setGeneratedHtml(parsedJson.main_code);
                setCurrentSuggestions(parsedJson.suggestions);
                setMessages(prev => [...prev, { role: 'assistant', content: "I've updated the design. Click 'Suggest Improvements' to see variations." }]);
                setLastGeneratedCopy(null);
            } else {
                throw new Error("Design API response was missing 'main_code' or 'suggestions'.");
            }
        } else if (intent.includes("COPY")) {
            const systemPrompt = `You are a professional copywriter. Your task is to generate compelling, clear, and concise text based on the user's request. Respond only with the generated text, without any additional comments or formatting.\n\nUser request: "${currentInput}"`;
            const generatedCopy = await callCohereAPI(systemPrompt);
            setLastGeneratedCopy(generatedCopy);
            setMessages(prev => [...prev, { role: 'assistant', content: `Here's some copy for you:\n\n---\n\n*${generatedCopy}*\n\n---\n\nI've remembered this, so just ask me where you'd like to put it.` }]);
        } else {
             throw new Error("Could not determine the user's intent. Please clarify if you'd like a design change or written content.");
        }

    } catch (error) {
        console.error("An error occurred in handleSend:", error);
        setMessages(prev => [...prev, { role: 'assistant', content: `Sorry, I encountered an error: ${error.message}` }]);
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleBrandingGeneration = async () => {
    if (isLoading || generatedHtml === initialHtml) return;
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: "Please generate a branding kit for this design." }]);
    try {
      const systemPrompt = `You are a professional brand designer. Analyze the provided HTML code to understand its purpose (e.g., e-commerce, portfolio, blog). Based on this, generate a cohesive branding kit. Your entire response must be a single, valid JSON object with two keys: "colorPalette" (an array of color objects with name, hex, use) and "fontPairing" (an object with "heading" and "body" keys). **HTML to Analyze:**\n\`\`\`html\n${generatedHtml}\n\`\`\``;
      const responseText = await callGeminiAPI([{ parts: [{ text: systemPrompt }] }]);
      
      let brandingKit;
      try {
        brandingKit = JSON.parse(responseText);
      } catch (error) {
        console.error("Failed to parse BRANDING JSON:", responseText);
        throw new Error("The AI's response for the branding kit was not in the expected format.");
      }
      
      let formattedResponse = "### 🎨 Here's a Branding Kit for Your Design:\n\n**Color Palette:**\n";
      brandingKit.colorPalette?.forEach(color => {
        formattedResponse += `- **${color.name}** (\`${color.hex}\`): ${color.use}\n`;
      });
      formattedResponse += "\n**Font Pairing:**\n";
      const { heading, body } = brandingKit.fontPairing || {};
      if (heading) formattedResponse += `- **Headings:** [${heading}](https://fonts.google.com/specimen/${heading.replace(/ /g, '+')})\n`;
      if (body) formattedResponse += `- **Body:** [${body}](https://fonts.google.com/specimen/${body.replace(/ /g, '+')})\n`;
      
      setMessages(prev => [...prev, { role: 'assistant', content: formattedResponse }]);
    } catch (error) {
        console.error("Failed to generate branding:", error);
        setMessages(prev => [...prev, { role: 'assistant', content: `Sorry, I couldn't generate a branding kit: ${error.message}` }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: "Sketch uploaded. Generating website..." }]);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result.split(',')[1];
      try {
        const systemPrompt = `You are an expert web developer specializing in Tailwind CSS. Analyze the provided website sketch and generate a primary HTML version ("main_code") and 3 improved variations ("suggestions"). Use placeholder images from placehold.co. Respond with a single, valid JSON object with these two keys.`;
        const contents = [{ parts: [{ text: systemPrompt }, { inlineData: { mimeType: file.type, data: base64Data } }] }];
        const responseText = await callGeminiAPI(contents);
        
        let parsedJson;
        try {
            parsedJson = JSON.parse(responseText);
        } catch (error) {
            console.error("Failed to parse IMAGE UPLOAD JSON:", responseText);
            throw new Error("The AI's response to the image was not in the expected format.");
        }

        if (parsedJson.main_code && parsedJson.suggestions) {
            setGeneratedHtml(parsedJson.main_code);
            setCurrentSuggestions(parsedJson.suggestions);
            setMessages(prev => [...prev, { role: 'assistant', content: "Done! Here's the design from your sketch." }]);
        } else {
            throw new Error("API response did not contain the expected JSON structure from the image.");
        }
      } catch (error) {
        console.error("Failed to generate code from image:", error);
        setMessages(prev => [...prev, { role: 'assistant', content: `Sorry, I couldn't process the image: ${error.message}` }]);
      } finally {
        setIsLoading(false);
        if(fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.readAsDataURL(file);
  };
  
  // --- Other handlers (handlePersonaFeedback, handleSeoAudit, handleAccessibilityAudit, etc.) can be kept largely the same ---
  // Just ensure they call the updated `callGeminiAPI` function.
    const handlePersonaFeedback = async (persona) => {
        if (isLoading || generatedHtml === initialHtml) return;
        setPersonaMenuOpen(false);
        setIsLoading(true);
        setMessages(prev => [...prev, { role: 'user', content: `Please provide feedback from the perspective of a ${persona}.` }]);
        try {
            const systemPrompt = `You are an AI assistant acting as a specific persona. Your task is to analyze the provided HTML code and give feedback from that persona's point of view. **Your Persona:** ${persona}. **Persona Instructions:** - If you are a 'Marketing Expert': Focus on conversion rates, CTAs, value proposition clarity, and user engagement. - If you are a 'Minimalist Designer': Focus on whitespace, typography, color palette simplicity, and removal of non-essential elements. - If you are a 'Gen Z User': Focus on modern aesthetics, mobile-friendliness, interactivity, and social media integration potential. Be informal and use emojis. **Your Task:** 1. Analyze the HTML. 2. Write a concise report (2-3 paragraphs) in the voice of your persona using markdown. **HTML to Analyze:** \`\`\`html ${generatedHtml} \`\`\` Now, provide your feedback as the ${persona}.`;
            const feedback = await callGeminiAPI([{ parts: [{ text: systemPrompt }] }], "text/plain");
            setMessages(prev => [...prev, { role: 'assistant', content: feedback }]);
        } catch (error) {
            console.error("Failed to get persona feedback:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: `Sorry, I couldn't get feedback from that persona: ${error.message}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSeoAudit = async () => {
        if (isLoading || generatedHtml === initialHtml) return;
        setIsLoading(true);
        setMessages(prev => [...prev, { role: 'user', content: "Please run an SEO audit on the current design." }]);
        try {
            const systemPrompt = `You are an expert SEO consultant. Analyze the following HTML code for on-page SEO best practices. Provide a report in markdown format with suggestions for keywords, and improvements for title, meta description, headings, and image alt text. **HTML to Audit:**\n\`\`\`html\n${generatedHtml}\n\`\`\``;
            const seoReport = await callGeminiAPI([{ parts: [{ text: systemPrompt }] }], "text/plain");
            setMessages(prev => [...prev, { role: 'assistant', content: seoReport }]);
        } catch (error) {
            console.error("Failed to run SEO audit:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: `Sorry, the SEO audit failed: ${error.message}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAccessibilityAudit = async () => {
        if (isLoading || generatedHtml === initialHtml) return;
        setIsLoading(true);
        setMessages(prev => [...prev, { role: 'user', content: "Please run an accessibility audit on the current design." }]);
        try {
            const systemPrompt = `You are an expert web accessibility consultant. Analyze the following HTML code for compliance with WCAG 2.1 AA standards. Identify issues like missing alt text, poor contrast, non-semantic tags, missing labels, and keyboard navigation problems. Provide a report in markdown, explaining each issue and suggesting the corrected code snippet. **HTML to Audit:**\n\`\`\`html\n${generatedHtml}\n\`\`\``;
            const auditReport = await callGeminiAPI([{ parts: [{ text: systemPrompt }] }], "text/plain");
            setMessages(prev => [...prev, { role: 'assistant', content: auditReport }]);
        } catch (error) {
            console.error("Failed to run accessibility audit:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: `Sorry, the accessibility audit failed: ${error.message}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleShowSuggestions = () => { if (isLoading || generatedHtml === initialHtml) return; setSuggestionModalOpen(true); };
    const handleApplySuggestion = (html) => { setGeneratedHtml(html); setSuggestionModalOpen(false); setMessages(prev => [...prev, { role: 'assistant', content: "Great! I've applied the new design." }]); };
    const handleDownloadCode = () => { if (generatedHtml === initialHtml) return; const blob = new Blob([generatedHtml], { type: 'text/html' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'index.html'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url); };
  
    // --- useEffect Hooks ---
    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            setIsSpeechApiAvailable(true);
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.onresult = (event) => setUserInput(prev => prev ? `${prev} ${event.results[0][0].transcript}`: event.results[0][0].transcript);
            recognitionRef.current.onend = () => setIsListening(false);
            recognitionRef.current.onerror = (event) => { console.error("Speech recognition error:", event.error); setIsListening(false); };
        } else { setIsSpeechApiAvailable(false); }
    }, []);

    // ✨ UX IMPROVEMENT: Hook to close persona menu on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (personaMenuRef.current && !personaMenuRef.current.contains(event.target)) {
                setPersonaMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [personaMenuRef]);

    const handleMicClick = () => {
        if (!isSpeechApiAvailable || !recognitionRef.current) return;
        if (isListening) { recognitionRef.current.stop(); } 
        else { try { recognitionRef.current.start(); setIsListening(true); } catch (error) { console.error("Could not start speech recognition:", error); setIsListening(false); } }
    };

  return (
    <>
      <div className="flex h-screen font-sans bg-[#0d1117] text-white">
        <input type="file" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} accept="image/*" />
        
        <div className="w-2/5 flex flex-col border-r border-gray-700">
          <header className="p-4 border-b border-gray-700 flex justify-between items-center">
            <div>
                <h1 className="text-xl font-bold">AI Design Chatbot</h1>
                <p className="text-sm text-gray-400">Powered by Gemini & Cohere</p>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 disabled:opacity-50" onClick={() => fileInputRef.current.click()} disabled={isLoading}>
                <UploadIcon /> Upload Sketch
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0"><BotIcon /></div>}
                <div className={`px-4 py-3 rounded-xl max-w-md prose prose-invert prose-p:text-white ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                  <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br />') }}></p>
                </div>
                {msg.role === 'user' && <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0"><UserIcon /></div>}
              </div>
            ))}
            {isLoading && <div className="flex items-start gap-3"><div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0"><BotIcon /></div><div className="px-4 py-3 rounded-xl bg-gray-700"><div className="flex items-center space-x-2"><div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div><div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-75"></div><div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-150"></div></div></div></div>}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center bg-gray-800 rounded-lg p-2">
              <input type="text" className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-400" placeholder="Describe a design or ask for copy..." value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()} disabled={isLoading}/>
              <button className="p-2 hover:bg-gray-700 rounded-md transition-colors disabled:opacity-50 group relative" onClick={handleMicClick} disabled={!isSpeechApiAvailable || isLoading}>
                <MicrophoneIcon isListening={isListening} />
                {!isSpeechApiAvailable && <span className="absolute bottom-full mb-2 w-max px-2 py-1 text-xs bg-gray-900 rounded-md opacity-0 group-hover:opacity-100">Voice input not supported</span>}
              </button>
              <button className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-gray-500" onClick={handleSend} disabled={!userInput.trim() || isLoading}><SendIcon /></button>
            </div>
          </div>
        </div>

        <div className="w-3/5 flex flex-col">
           <header className="p-4 border-b border-gray-700 bg-gray-800 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Live Preview</h2>
            <div className="flex items-center gap-2 flex-wrap justify-end">
               <div className="relative" ref={personaMenuRef}>
                  <button onClick={() => setPersonaMenuOpen(!personaMenuOpen)} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors" disabled={isLoading || generatedHtml === initialHtml}>
                      <FeedbackIcon /> Get Feedback
                  </button>
                  {personaMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-[#1f2937] border border-gray-600 rounded-md shadow-lg z-10">
                          <button onClick={() => handlePersonaFeedback('Marketing Expert')} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Marketing Expert</button>
                          <button onClick={() => handlePersonaFeedback('Minimalist Designer')} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Minimalist Designer</button>
                          <button onClick={() => handlePersonaFeedback('Gen Z User')} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Gen Z User</button>
                      </div>
                  )}
               </div>
               <button onClick={handleBrandingGeneration} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors" disabled={isLoading || generatedHtml === initialHtml}> <PaletteIcon /> Generate Branding </button>
               <button onClick={handleAccessibilityAudit} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors" disabled={isLoading || generatedHtml === initialHtml}> <AccessibilityIcon /> Audit Accessibility </button>
              <button onClick={handleSeoAudit} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors" disabled={isLoading || generatedHtml === initialHtml}> <SeoIcon /> Audit SEO </button>
              <button onClick={handleShowSuggestions} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors" disabled={isLoading || generatedHtml === initialHtml}> <SparklesIcon /> Suggest Improvements </button>
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors" onClick={handleDownloadCode} disabled={isLoading || generatedHtml === initialHtml}> <DownloadIcon /> Download Code </button>
            </div>
          </header>
          <div className="flex-1 bg-white">
            <iframe srcDoc={generatedHtml} title="Website Preview" className="w-full h-full border-none" sandbox="allow-scripts"/>
          </div>
        </div>
      </div>
      <SuggestionModal isOpen={suggestionModalOpen} onClose={() => setSuggestionModalOpen(false)} suggestions={currentSuggestions} onApply={handleApplySuggestion} />
    </>
  );
}