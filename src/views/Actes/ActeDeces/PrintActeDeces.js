import React, { useEffect } from "react";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  PDFViewer,
  View,
  Line,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "stretch",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },
  body: {
    marginLeft: 10,
    marginTop: 10,
  },
  footer: {
    marginLeft: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 8,
    lineHeight: 2, // Ajustez cette valeur pour contrôler l'interligne
  },
  centerText: {
    textAlign: "center",
  },
  smallText: {
    fontSize: 8,
    lineHeight: 1.5, // Ajustez cette valeur pour contrôler l'interligne
  },
});

const PDF = ({ acteDeces }) => {
  return (
    <PDFViewer width="100%" height={500}>
      <Document>
        <Page size="A6" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.text, styles.smallText]}>
              Royaume du Maroc
            </Text>
            <Text style={[styles.text, styles.smallText]}>
              Ministère de l'Intérieur
            </Text>
            <Text style={[styles.text, styles.smallText]}>Wilaya Region</Text>
            <Text style={[styles.text, styles.smallText]}>Préfecture</Text>
            <Text style={[styles.text, styles.smallText]}>Conseil</Text>
            <Text style={[styles.text, styles.smallText]}>
              Bureau d'État Civil
            </Text>
            <Text style={[styles.text, styles.smallText]}>
              Acte n° {acteDeces.id}
            </Text>
            <Text
              style={[
                styles.text,
                styles.centerText,
                { fontWeight: "bold", fontSize: "10" },
              ]}
            >
              Extrait d'acte de décès
            </Text>
          </View>
          <Line
            style={{
              margin: 5,
              borderBottomColor: "black",
              borderBottomWidth: 1,
            }}
          />

          {/* Body */}
          <View style={styles.body}>
            <Text style={styles.text}>Nom : {acteDeces.nom}</Text>
            <Text style={styles.text}>Prénom : {acteDeces.prenom}</Text>
            <Text style={styles.text}>
              Décédé(e) le : {acteDeces.dateDeces}
            </Text>
            <Text style={styles.text}>À : {acteDeces.lieuDeces}</Text>
            <Text style={styles.text}>Habitant : {acteDeces.adresse}</Text>
            <Text style={styles.text}>Profession : {acteDeces.profession}</Text>
            <Text style={styles.text}>
              Né(e) le : {acteDeces.dateNaissance}
            </Text>
            <Text style={styles.text}>À : {acteDeces.lieuNaissance}</Text>
            <Text style={styles.text}>Fils de : {acteDeces.pere}</Text>
            <Text style={styles.text}>Et de : {acteDeces.mere}</Text>
          </View>
          <Line
            style={{
              margin: 5,
              borderBottomColor: "black",
              borderBottomWidth: 1,
            }}
          />

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.text, styles.smallText]}>Le : 01/01/2023</Text>
            <Text style={[styles.text, styles.smallText]}>À : Rabat</Text>
            <Text style={[styles.text, styles.smallText]}>
              Officier : John Smith
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDF;
