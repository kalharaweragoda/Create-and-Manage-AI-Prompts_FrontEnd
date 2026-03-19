import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Send, Search, FileText } from 'lucide-react';

const PromptManager = () => {
    const [templates, setTemplates] = useState([]);
    const [promptText, setPromptText] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await axios.get('http://localhost:8080/prompts');
                setTemplates(response.data);
            } catch (error) {
                console.error("Error fetching templates:", error);
            }
        };
        fetchTemplates();
    }, []);

    const handleTemplateClick = (content) => {
        setPromptText(content);
        document.getElementById("main-prompt-input").focus();
    };

    const handleSendPrompt = async () => {
        if (!promptText) return;
        try {
            await axios.post('http://localhost:8080/prompts', { prompt: promptText });
            alert("Prompt sent successfully!");
            setPromptText("");
        } catch (error) {
            console.error("Error sending prompt:", error);
        }
    };

    return (
        <div style={styles.dashboard}>
            {/* Sidebar: Templates List */}
            <div style={styles.sidebar}>
                <div style={styles.searchContainer}>
                    <Search size={18} style={styles.searchIcon} />
                    <input 
                        type="text" 
                        placeholder="Search templates..." 
                        style={styles.sidebarSearch}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div style={styles.templateList}>
                    {templates.filter(t => t.id.includes(searchTerm)).map((template) => (
                        <div 
                            key={template.id} 
                            style={styles.templateCard} 
                            onClick={() => handleTemplateClick(template.content)}
                        >
                            <div style={styles.pdfThumbnail}>
                                <FileText color="#fff" size={32} />
                                <div style={styles.pdfTextOverlay}>
                                    {template.content.substring(0, 50)}...
                                </div>
                            </div>
                            <span style={styles.templateId}>ID: {template.id}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content: Prompt Editor */}
            <div style={styles.mainContent}>
                <div style={styles.editorArea}>
                    {}
                </div>

                {/* Bottom Search Bar */}
                <div style={styles.bottomBar}>
                    <div style={styles.inputWrapper}>
                        <textarea
                            id="main-prompt-input"
                            value={promptText}
                            onChange={(e) => setPromptText(e.target.value)}
                            placeholder="Type your prompt here..."
                            style={styles.mainInput}
                        />
                        <button onClick={handleSendPrompt} style={styles.sendButton}>
                            <Send size={24} color="#fff" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// පින්තූරයේ පරිදි Dark Theme එකට අදාළ Styles
const styles = {
    dashboard: { display: 'flex', height: '100vh', backgroundColor: '#1a1b26', color: '#fff' },
    sidebar: { width: '300px', backgroundColor: '#24283b', borderRight: '1px solid #414868', display: 'flex', flexDirection: 'column' },
    searchContainer: { padding: '20px', position: 'relative' },
    sidebarSearch: { width: '100%', padding: '10px 10px 10px 35px', borderRadius: '20px', border: 'none', backgroundColor: '#414868', color: '#fff' },
    searchIcon: { position: 'absolute', left: '30px', top: '30px', color: '#9ece6a' },
    templateList: { overflowY: 'auto', padding: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
    templateCard: { cursor: 'pointer', textAlign: 'center' },
    pdfThumbnail: { backgroundColor: '#fff', height: '120px', borderRadius: '5px', padding: '10px', color: '#333', fontSize: '8px', overflow: 'hidden', position: 'relative' },
    pdfTextOverlay: { marginTop: '5px', textAlign: 'left' },
    templateId: { fontSize: '12px', marginTop: '5px', display: 'block', color: '#a9b1d6' },
    mainContent: { flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' },
    editorArea: { flex: 1, padding: '20px' },
    bottomBar: { padding: '20px', backgroundColor: '#16161e' },
    inputWrapper: { display: 'flex', alignItems: 'center', backgroundColor: '#414868', borderRadius: '25px', padding: '10px 20px' },
    mainInput: { flex: 1, background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '16px', height: '40px', resize: 'none' },
    sendButton: { background: 'none', border: 'none', cursor: 'pointer', marginLeft: '10px' }
};

export default PromptManager;