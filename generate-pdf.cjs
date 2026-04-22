const { mdToPdf } = require('md-to-pdf');

(async () => {
    try {
        console.log('Generating PDF...');
        const pdf = await mdToPdf(
            { path: 'CV_DoThePhuong.md' },
            { 
                dest: 'public/CV.pdf',
                pdf_options: {
                    format: 'A4',
                    margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
                    printBackground: true
                },
                launch_options: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
            }
        );
        if (pdf) {
            console.log('PDF created successfully at public/CV.pdf!');
        } else {
            console.log('Failed to generate PDF.');
        }
    } catch (err) {
        console.error('Error generating PDF:', err);
    }
})();
