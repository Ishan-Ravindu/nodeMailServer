const createEmail =(from:string, to:string, subject:string, text:string, html:string)=> `From: ${from}
To: ${to}
Subject: ${subject}

${text || html}`;

export default createEmail;