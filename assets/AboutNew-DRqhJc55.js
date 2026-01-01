import{j as e}from"./tanstack-C-bMWpiN.js";import{r as a}from"./react-Czg6sI-Z.js";import{B as b}from"./button-9kf-wByO.js";import{T as g}from"./utils-ftzQqGR7.js";import"./radix-ui-BfIhwije.js";import"./index-C0B6ixeK.js";import"./react-router-DdlC8Gxl.js";const j=()=>{const[s,r]=a.useState(""),[c,l]=a.useState([]),[d,u]=a.useState(!1),m=a.useRef(null),f=a.useRef(null),p={help:()=>`Available commands:
• help - Show this help message
• about - About Mohammad Jaber
• skills - Technical skills
• experience - Work experience
• education - Education and certifications
• contact - Contact information
• clear - Clear terminal`,about:()=>`Mohammad Jaber - Flutter Developer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Location: Amman, Jordan
Specialization: Flutter & Mobile Development
Focus: Building scalable, beautiful mobile applications

Passionate about creating innovative mobile experiences 
that solve real-world problems with clean, efficient code.`,skills:()=>`Technical Skills:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Mobile Development:
  • Flutter (Dart) - Advanced
  • Android (Java/Kotlin) - Intermediate
  • iOS Development - Intermediate
  
Backend & APIs:
  • Node.js - Intermediate
  • REST APIs - Advanced
  • Firebase - Advanced
  • Supabase - Intermediate
  
Tools & Technologies:
  • Git/GitHub - Advanced
  • Docker - Intermediate
  • CI/CD - Intermediate`,experience:()=>`Work Experience:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Flutter Developer - Mujeer
Full-time | 2025 - Present | Amman, Jordan
Leading mobile development initiatives with focus on scalable Flutter applications.

Key Achievements:
• Architected and delivered 3+ enterprise mobile applications
• Implemented real-time data synchronization reducing load times by 40%
• Led code reviews and mentored junior developers
• Integrated IoT devices with mobile applications for smart solutions

CSD Team Leader - Community Development
Leadership | 2024 - 2025 | Amman, Jordan
Leading technical workshops and community development initiatives in software engineering.

Key Achievements:
• Organized 15+ technical workshops reaching 200+ developers
• Mentored 30+ junior developers in mobile development
• Built strategic partnerships with local tech companies
• Established coding bootcamp curriculum for Flutter development

Mobile Developer - Freelance
Contract | 2023 - 2025 | Remote
Developed custom mobile solutions for startups and small businesses across various industries.

Key Achievements:
• Delivered 7 mobile applications with 10k+ total downloads
• Maintained 4.8+ star rating across all published apps
• Reduced development time by 30% through reusable component libraries
• Implemented payment gateways and e-commerce features`,education:()=>`Education and Certifications:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
B.Sc. in Computing Smart Devices
Tafila Technical University, Jordan (June 2025)

Certifications:
• The Complete 2022 Flutter & Dart Development Course | Udemy
• Flutter Advanced Course Bloc and MVVM Pattern | Udemy
• CI/CD for Mobile Applications | Udemy | 2024
• Complete C# Masterclass | Udemy | 2025
• Coaching Career Guidance (CCG) Program from Coach You`,contact:()=>`Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: mhammdjbr555@gmail.com
LinkedIn: https://www.linkedin.com/in/mohammad-jaber-profile/
GitHub: https://github.com/mjaber5
Phone: +962 779294486`,clear:()=>"CLEAR_TERMINAL",whoami:()=>"mohammad-jaber@portfolio:~$ Flutter Developer & Mobile App Specialist"},h=t=>{const i=t.toLowerCase().trim(),o=p[i];if(o){const n=o();if(n==="CLEAR_TERMINAL"){l([]);return}return n}else return`Command not found: ${t}. Type 'help' for available commands.`},v=t=>{t.preventDefault(),s.trim()&&(u(!0),setTimeout(()=>{const i=h(s),o={input:s.trim(),output:i,timestamp:new Date};l(n=>[...n,o]),r(""),u(!1)},500))},x=t=>{r(t),setTimeout(()=>{const i=h(t),o={input:t,output:i,timestamp:new Date};l(n=>[...n,o]),r("")},300)};return a.useEffect(()=>{m.current&&(m.current.scrollTop=m.current.scrollHeight)},[c]),a.useEffect(()=>{l([{input:"welcome",output:`Welcome to Mohammad Jaber's Portfolio Terminal!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type 'help' to see available commands or try:
• 'about' - Learn about me
• 'skills' - View my technical skills
• 'experience' - See my work experience`,timestamp:new Date}])},[]),e.jsx("section",{className:"py-20 px-4 sm:px-6 lg:px-8",id:"about",children:e.jsxs("div",{className:"max-w-6xl mx-auto",children:[e.jsxs("div",{className:"text-center mb-12",children:[e.jsx("h2",{className:"text-3xl md:text-4xl font-bold text-foreground mb-4",children:"About Me"}),e.jsx("p",{className:"text-lg text-muted-foreground max-w-2xl mx-auto",children:"Explore my background, skills, and experience through this interactive terminal"})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-12 items-start",children:[e.jsxs("div",{className:"bg-background border border-border rounded-lg shadow-lg overflow-hidden",children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-3 bg-muted border-b border-border",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("div",{className:"w-3 h-3 bg-red-500 rounded-full"}),e.jsx("div",{className:"w-3 h-3 bg-yellow-500 rounded-full"}),e.jsx("div",{className:"w-3 h-3 bg-green-500 rounded-full"})]}),e.jsxs("div",{className:"flex items-center space-x-2 text-sm text-muted-foreground",children:[e.jsx(g,{className:"w-4 h-4"}),e.jsx("span",{children:"terminal"})]})]}),e.jsxs("div",{ref:m,className:"p-4 h-96 overflow-y-auto bg-background font-mono text-sm",children:[c.map((t,i)=>e.jsxs("div",{className:"mb-4",children:[e.jsxs("div",{className:"flex items-center space-x-2 text-primary",children:[e.jsx("span",{children:"$"}),e.jsx("span",{children:t.input})]}),e.jsx("div",{className:"mt-1 text-foreground whitespace-pre-line pl-4",children:t.output})]},i)),e.jsxs("form",{onSubmit:v,className:"flex items-center space-x-2",children:[e.jsx("span",{className:"text-primary",children:"$"}),e.jsx("input",{ref:f,type:"text",value:s,onChange:t=>r(t.target.value),className:"flex-1 bg-transparent outline-none text-foreground",placeholder:"Type a command...",disabled:d}),d&&e.jsx("div",{className:"w-2 h-4 bg-primary animate-pulse"})]})]})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-xl font-semibold text-foreground mb-4",children:"Quick Commands"}),e.jsx("p",{className:"text-muted-foreground mb-6",children:"Click any command below to run it in the terminal, or type them manually."})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:Object.keys(p).filter(t=>t!=="clear").map(t=>e.jsx(b,{variant:"outline",className:"justify-start text-left h-auto p-4",onClick:()=>x(t),children:e.jsxs("div",{children:[e.jsx("div",{className:"font-semibold",children:t}),e.jsxs("div",{className:"text-xs text-muted-foreground mt-1",children:[t==="help"&&"Show available commands",t==="about"&&"Learn about my background",t==="skills"&&"View technical skills",t==="experience"&&"Work experience",t==="education"&&"Education and certifications",t==="contact"&&"Contact information",t==="whoami"&&"Current user info"]})]})},t))}),e.jsx("div",{className:"pt-4",children:e.jsx(b,{variant:"ghost",onClick:()=>x("clear"),className:"text-muted-foreground hover:text-foreground",children:"Clear Terminal"})})]})]})]})})},T=a.memo(j);export{T as default};
