import jsPDF from 'jspdf'
import store from '../store'

let imgData = "data:image/png;base64,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"

let docsList = []

function docs(type) {
    switch (type) {
        case "RG":
            docsList = [
                {
                    doc: "docRG1"
                },
                {
                    doc: "docRG2"
                }
            ];
            console.log(docsList);
            break;

        case "CPF":
            docsList = [
                {
                    doc: "docCPF1"
                },
                {
                    doc: "docCPF2"
                }
            ];
            console.log(docsList)
            break
        case "CTPS":
            docsList = [
                {
                    doc: "docCTPS1"
                },
                {
                    doc: "docCTPS2"
                }
            ];
            console.log(docsList)
    }

    return docsList
}

export default () => {
    const pdf = new jsPDF({
        orientation: 'p',
        unit: 'cm',
        format: 'a4'
    })

    let name = store.state.name

    function nameURL() {
        let newname = name.toLowerCase().split(' ')

        let nameComplete = ''

        for (let i = 0; i < newname.length; i++) {
            nameComplete += "-" + newname[i]
        }

        return nameComplete
    }

    let type = store.state.type
    docs(type)

    
    let date = store.state.date
    let pass = store.state.pass

    pdf.setFontSize(17)

    let pageWidth = pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();

    pdf.addImage(imgData, 'PNG', pageWidth / 2.2, 1.2)

    pdf.setTextColor(16, 32, 44)
    pdf.text('DADOS', 4, 6)

    pdf.setTextColor(44, 62, 80)

    pdf.text('nome: ' + `${name}`, 4.5, 7)

    pdf.text('agendamento: ' + `${type}`, 4.5, 8)

    pdf.text('data: ' + `${date}`, 4.5, 9)

    pdf.setTextColor(16, 32, 44)

    pdf.text('DOCUMENTOS NECESSÁRIOS', 4, 11)

    pdf.setTextColor(44, 62, 80)

    for (let i = 0; i < docsList.length; i++) {
        pdf.text(docsList[i].doc, 4.5, 12 + i)
    }

    pdf.setFillColor(243, 126, 126)
    pdf.roundedRect(6.5, 15.2, 8, 3, .4, .4, 'F')

    pdf.setTextColor(48, 20, 20)
    pdf.setFontSize(25)
    pdf.text("SENHA: " + `${pass}`, pageWidth / 2, 17, 'center')

    pdf.setFontSize(14)
    pdf.setTextColor(44, 62, 80)
    pdf.text("Aberto de Seg. à  Sex. das 08:00hrs às 18:00hrs", pageWidth / 2, 25, 'center')

    //Save
    pdf.save('agendamento-' + `${type}` + `${nameURL()}` + '.pdf')
}