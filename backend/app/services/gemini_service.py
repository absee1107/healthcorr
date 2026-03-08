import google.generativeai as genai
from typing import Optional, Dict, Any
from ..core.config import settings

class GeminiService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-pro')
    
    async def generate_content(self, prompt: str, context: Optional[str] = None) -> str:
        """Generate content using Gemini AI"""
        try:
            full_prompt = f"{context}\n\n{prompt}" if context else prompt
            response = self.model.generate_content(full_prompt)
            return response.text
        except Exception as e:
            raise Exception(f"Gemini AI error: {str(e)}")
    
    async def check_compliance(self, document_content: str, guidelines: str) -> Dict[str, Any]:
        """Check document compliance against guidelines"""
        prompt = f"""
        Analyze the following document for compliance with the given guidelines.
        
        Guidelines:
        {guidelines}
        
        Document:
        {document_content}
        
        Provide a detailed compliance report including:
        1. Overall compliance status (PASSED/FAILED/WARNING)
        2. List of violations (if any)
        3. Recommendations for improvement
        4. Specific sections that need attention
        
        Format the response as JSON.
        """
        
        response = await self.generate_content(prompt)
        return {"analysis": response}
    
    async def suggest_content(self, context: str, document_type: str) -> str:
        """Suggest content for document creation"""
        prompt = f"""
        Generate professional healthcare document content for a {document_type}.
        Context: {context}
        
        Provide appropriate medical terminology and professional tone.
        """
        return await self.generate_content(prompt)
    
    async def extract_key_info(self, document_content: str) -> Dict[str, Any]:
        """Extract key information from document"""
        prompt = f"""
        Extract key information from this healthcare document:
        {document_content}
        
        Identify:
        - Patient information (if present)
        - Key dates
        - Medical terms
        - Action items
        - Important entities
        
        Format as JSON.
        """
        response = await self.generate_content(prompt)
        return {"extracted_info": response}
    
    async def summarize_document(self, document_content: str) -> str:
        """Generate document summary"""
        prompt = f"""
        Provide a concise summary of this healthcare document:
        {document_content}
        
        Focus on key points, decisions, and action items.
        """
        return await self.generate_content(prompt)

gemini_service = GeminiService()
