import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer,  } from '@react-pdf/renderer';
import { SlideData } from '../context/ReportContext';
import TableDocument from './TablePDF';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 14,
    lineHeight: 1.5,
    marginBottom: 15,
  },
  recommendations: {
    marginTop: 20,
    padding: 10,
  },
  recommendationTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  recommendationItem: {
    marginBottom: 5,
    paddingLeft: 15,
  },
  table: {
    marginVertical: 15,
  },
  tableCaption: {
    marginBottom: 10,
    fontSize: 12,
    color: '#666',
  },
});

  

interface ReportPDFProps {
  slides: SlideData[];
}

export const ReportPDF: React.FC<ReportPDFProps> = ({ slides }) => {
  return (
    <PDFViewer width="100%" height="100%">
      <Document>
        {slides.map((slide, index) => (
          <Page 
            key={index}
            size="A4"
            orientation="landscape"
            style={styles.page}
          >
            <View>
              <Text style={styles.title}>{slide.title}</Text>
              
              {slide.content && slide.content.map((text, idx) => (
                <Text key={idx} style={styles.content}>
                  {text}
                </Text>
              ))}

              {slide.table && (
                <View style={styles.table}>
                  {slide.table_caption && (
                    <Text style={styles.tableCaption}>
                      {slide.table_caption}
                    </Text>
                  )}
                  <TableDocument tableContent={slide.table}/>
                </View>
              )}

              {slide.recommendations && slide.recommendations.length > 0 && (
                <View style={styles.recommendations}>
                  <Text style={styles.recommendationTitle}>
                    Recommendations
                  </Text>
                  {slide.recommendations.map((rec, idx) => (
                    <Text key={idx} style={styles.recommendationItem}>
                      • {rec}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </Page>
        ))}
      </Document>
    </PDFViewer>
  );
}; 