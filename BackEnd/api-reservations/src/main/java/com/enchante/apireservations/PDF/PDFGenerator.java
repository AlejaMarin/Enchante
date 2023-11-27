package com.enchante.apireservations.PDF;

import com.enchante.apireservations.Model.DTO.ReservationDTO;
import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

public class PDFGenerator {

    private List<ReservationDTO> userReservations;
    private static final Logger logger = LoggerFactory.getLogger(PDFGenerator.class);

    public PDFGenerator() {
    }

    public void generate(HttpServletResponse response) {

        try {

            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, response.getOutputStream());
            document.open();

            Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            fontTitle.setSize(20);
            fontTitle.setColor(13, 38, 59);

            Paragraph paragraph = new Paragraph("Reservaciones", fontTitle);
            paragraph.setAlignment(Paragraph.ALIGN_CENTER);
            paragraph.setSpacingAfter(20);

            document.add(paragraph);

            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100f);
            table.setWidths(new int[]{7, 7, 7, 7, 7});
            table.setSpacingBefore(5);
            table.setHorizontalAlignment(Element.ALIGN_CENTER);

            PdfPCell cell = new PdfPCell();
            cell.setBackgroundColor(new RGBColor(234, 115, 99));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setPadding(7);

            Font font = FontFactory.getFont(FontFactory.HELVETICA);
            font.setColor(13, 38, 59);

            cell.setPhrase(new Phrase("ID", font));
            table.addCell(cell);
            cell.setPhrase(new Phrase("Hora", font));
            table.addCell(cell);
            cell.setPhrase(new Phrase("Fecha", font));
            table.addCell(cell);
            cell.setPhrase(new Phrase("Número de Invitados", font));
            table.addCell(cell);
            cell.setPhrase(new Phrase("Mensaje", font));
            table.addCell(cell);

            for (ReservationDTO r : userReservations) {

                cell.setBackgroundColor(CMYKColor.WHITE);
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                cell.setPadding(7);

                cell.setPhrase(new Phrase(String.valueOf(r.getId()), font));
                table.addCell(cell);

                cell.setPhrase(new Phrase(String.valueOf(r.getTime()), font));
                table.addCell(cell);

                cell.setPhrase(new Phrase(String.valueOf(r.getDate()), font));
                table.addCell(cell);

                cell.setPhrase(new Phrase(String.valueOf(r.getAmountDiners()), font));
                table.addCell(cell);

                cell.setPhrase(new Phrase(String.valueOf(r.getMessage()), font));
                table.addCell(cell);
            }

            document.add(table);
            document.close();

        } catch (Exception e) {

            logger.error(e.getMessage());
        }
    }

    public void setUserReservations(List<ReservationDTO> userReservations) {
        this.userReservations = userReservations;
    }
}