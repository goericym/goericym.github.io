import pdfkit

# pdfkit.from_url('http://google.com', 'out.pdf')
pdfkit.from_file('print.html', 'iout.pdf')
# pdfkit.from_string('Hello!', 'out.pdf')