import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { IStudentsDetails } from '../../ui/SearchStudent/ISearchStudent'
import dayjs from 'dayjs'

pdfMake.vfs = pdfFonts.pdfMake.vfs

export const generateEntryPdf = (journal: IStudentsDetails[], name: string, surname: string) => {
    const summa = journal.reduce((a, b) => {
        return a + b.price
    }, 0)

    const pdf: any = {
        content: [
            {
                text: 'ПЛАТНАЯ ОТРАБОТКА',
                fontSize: 18,
                bold: true,
                alignment: 'center'
            },
            {
                text: `Ф.И.О.: ${surname} ${name}`,
                fontSize: 15,
                bold: true,
                italics: true,
                margin: [0, 20, 0, 0]
            },
            {
                text: `Сумма: ${summa} сомов`,
                fontSize: 14,
                bold: true,
                italics: true,
                margin: [0, 10, 0, 0]
            },
            {
                text: `Шифр: ${journal[0]?.shifr}`,
                fontSize: 14,
                bold: true,
                italics: true,
                margin: [0, 10, 0, 0]
            },
            {
                text: 'Дисциплина(ы):',
                margin: [0, 20, 0, 0],
                italics: true
            },
            {
                ol: journal.map(item => `${item.visitDate} ${item.short_name} ${item.discipline} ${item.t_fio}`),
                fontSize: 13,
                italics: true,
                margin: [0, 10, 0, 0]
            },
            {
                text: `Дата: ${dayjs(new Date()).format('DD.MM.YYYY HH:mm')}`,
                fontSize: 11,
                italics: true,
                margin: [0, 10, 0, 0]
            }
        ]
    }
    pdfMake.createPdf(pdf).download('Квитанция')
}
