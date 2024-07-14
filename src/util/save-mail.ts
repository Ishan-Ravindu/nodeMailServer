import * as path from 'path';
import * as fs from 'fs';

const saveMail = async (save_dir:string,emailContent: string) => {
    const fileName = `${Date.now()}.eml`;
    const filePath = path.join(save_dir, fileName);
    await fs.promises.writeFile(filePath, emailContent);
    
    console.log(`Email saved to: ${filePath}`);
}

export default saveMail;