from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


OUTPUT = "docs/institution-sales/lingo-booth-university-one-pager.pdf"


def para(text, style):
    return Paragraph(text, style)


def build():
    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=letter,
        rightMargin=0.55 * inch,
        leftMargin=0.55 * inch,
        topMargin=0.48 * inch,
        bottomMargin=0.45 * inch,
    )

    styles = getSampleStyleSheet()
    brand = colors.HexColor("#2563EB")
    ink = colors.HexColor("#111827")
    muted = colors.HexColor("#4B5563")
    line = colors.HexColor("#D7DEE8")
    pale_blue = colors.HexColor("#EFF6FF")
    pale_green = colors.HexColor("#ECFDF5")

    title = ParagraphStyle(
        "Title",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=23,
        leading=26,
        textColor=ink,
        spaceAfter=3,
    )
    subtitle = ParagraphStyle(
        "Subtitle",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=11.5,
        leading=14,
        textColor=brand,
        spaceAfter=8,
    )
    body = ParagraphStyle(
        "Body",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.8,
        leading=11.2,
        textColor=muted,
        spaceAfter=5,
    )
    section = ParagraphStyle(
        "Section",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=10.6,
        leading=12,
        textColor=ink,
        spaceBefore=2,
        spaceAfter=4,
    )
    small = ParagraphStyle(
        "Small",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=7.6,
        leading=9.4,
        textColor=muted,
    )
    small_bold = ParagraphStyle(
        "SmallBold",
        parent=small,
        fontName="Helvetica-Bold",
        textColor=ink,
    )
    metric = ParagraphStyle(
        "Metric",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=15,
        textColor=brand,
        alignment=1,
    )
    metric_label = ParagraphStyle(
        "MetricLabel",
        parent=small,
        alignment=1,
    )

    story = (
        "Lingo Booth helps universities extend language learning beyond class time with "
        "guided lessons, conversation practice, flashcards, quizzes, writing practice, "
        "progress tracking, certificates, and institution subscriptions. The platform "
        "supports 20 languages as both learning targets and learner interface/native languages."
    )

    benefits = [
        "Structured practice between live class sessions",
        "Speaking, writing, review, and confidence-building in one platform",
        "Web and mobile access for flexible student practice",
        "Multiple native-to-target language pairs, not a single-language program",
        "Cohort-based access with reporting and expansion options",
    ]
    benefit_table = Table(
        [[para(item, small)] for item in benefits],
        colWidths=[3.45 * inch],
        hAlign="LEFT",
    )
    benefit_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), pale_blue),
        ("BOX", (0, 0), (-1, -1), 0.7, line),
        ("INNERGRID", (0, 0), (-1, -1), 0.4, colors.white),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))

    pilot_rows = [
        [para("Pilot length", small_bold), para("6 weeks", small)],
        [para("Cohort", small_bold), para("Up to 100 learners", small)],
        [para("Best fit", small_bold), para("One department, course, study abroad cohort, or student support program", small)],
        [para("Included", small_bold), para("Learner access, instructor/admin access where available, launch support, midpoint check-in, final summary", small)],
        [para("Draft fee", small_bold), para("$2,500, credited toward an annual subscription if the university continues within 30 days", small)],
    ]
    pilot_table = Table(
        pilot_rows,
        colWidths=[1.05 * inch, 5.15 * inch],
        hAlign="LEFT",
    )
    pilot_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), pale_green),
        ("BOX", (0, 0), (-1, -1), 0.7, colors.HexColor("#B7E4CF")),
        ("INNERGRID", (0, 0), (-1, -1), 0.35, colors.white),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))

    metrics = Table(
        [
            [para("75%+", metric), para("60%+", metric), para("3+", metric), para("1", metric)],
            [
                para("invited learners activate", metric_label),
                para("activated learners practice weekly", metric_label),
                para("practice modes used", metric_label),
                para("clear expansion decision", metric_label),
            ],
        ],
        colWidths=[1.55 * inch] * 4,
        hAlign="LEFT",
    )
    metrics.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.7, line),
        ("INNERGRID", (0, 0), (-1, -1), 0.35, line),
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#F9FAFB")),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))

    use_cases = [
        [para("Language departments", small_bold), para("More out-of-class practice for enrolled students.", small)],
        [para("Study abroad offices", small_bold), para("Pre-departure communication readiness.", small)],
        [para("International support", small_bold), para("Flexible practice for campus and academic situations.", small)],
        [para("Continuing education", small_bold), para("Digital practice alongside paid language cohorts.", small)],
    ]
    use_case_table = Table(
        use_cases,
        colWidths=[1.55 * inch, 4.65 * inch],
        hAlign="LEFT",
    )
    use_case_table.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.7, line),
        ("INNERGRID", (0, 0), (-1, -1), 0.35, line),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 4.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4.5),
    ]))

    content = [
        para("Lingo Booth For Universities", title),
        para("Structured language practice across web and mobile", subtitle),
        para(story, body),
        para("Why Universities Care", section),
        benefit_table,
        Spacer(1, 7),
        para("Recommended First Pilot", section),
        pilot_table,
        Spacer(1, 7),
        para("Success Metrics", section),
        metrics,
        Spacer(1, 7),
        para("Best-Fit University Use Cases", section),
        use_case_table,
        Spacer(1, 7),
        para("Next Step", section),
        para("Define one pilot cohort, one target language program, launch date, success metrics, and procurement path.", body),
        Spacer(1, 3),
        para("<b>Contact:</b> [Your Name] &nbsp; | &nbsp; [your.email@example.com] &nbsp; | &nbsp; [Your Phone] &nbsp; | &nbsp; [Website URL]", small),
    ]

    doc.build(content)


if __name__ == "__main__":
    build()
