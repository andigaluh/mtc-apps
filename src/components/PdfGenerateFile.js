import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { formatdate } from "../helpers/DateCustom";
import PdfHeaderSection from "./PdfHeaderSection";
import PdfContentAdditionalCheck from "./PdfContentAdditionalCheck";
import PdfContentDetailNg from "./PdfContentDetailNg";
import PdfContentItemCheck from "./PdfContentItemCheck";
import PdfContentManagerApproval from "./PdfContentManagerApproval";



const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
  },

  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
  },

  content: {
    display: "flex",
    flexDirection: "column",
  },

  content__info: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  info__item: {
    marginBottom: "20",
  },
  item__label: {
    fontSize: "9",
    fontWeight: "normal",
    marginBottom: "5",
    marginRight: "20",
  },
  item__value: {
    fontSize: "10",
    fontWeight: "normal",
    borderBottom: "1px solid grey",
    width: "160",
    marginRight: "20",
  },
  content__item: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20",
  },
  
});

function PdfGenerateFile({ machine, machineApproval }) {  

  let itemCheck = machine.status_parts;
  let detailNg = machine.problems;
  let additionalCheck = machine.need_parts;
  let machineApprovalItems = machineApproval;
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.content__info}>
              <View style={styles.info__item}>
                <Text style={styles.item__label}>Machine Name</Text>
                <Text style={styles.item__value}>{machine.machine_name}</Text>
              </View>
              <View style={styles.info__item}>
                <Text style={styles.item__label}>Profile (Inspector)</Text>
                <Text style={styles.item__value}>
                  {machine.inspection_name}
                </Text>
              </View>
              <View style={styles.info__item}>
                <Text style={styles.item__label}>Shift</Text>
                <Text style={styles.item__value}>{machine.shift_name}</Text>
              </View>
              <View style={styles.info__item}>
                <Text style={styles.item__label}>Date</Text>
                <Text style={styles.item__value}>
                  {formatdate(machine.date)}
                </Text>
              </View>
              <View style={styles.info__item}>
                <Text style={styles.item__label}>Time</Text>
                <Text style={styles.item__value}>{machine.time}</Text>
              </View>
              <View style={styles.info__item}>
                <Text style={styles.item__label}>No Document</Text>
                <Text style={styles.item__value}>{machine.no_dokumen}</Text>
              </View>
            </View>
            {itemCheck && (
              <View style={styles.content__item}>
                <PdfHeaderSection titleSection="Spareparts Condition" />
                <PdfContentItemCheck content={itemCheck} />
              </View>
            )}
            {detailNg.length > 0 && (
              <View style={styles.content__item}>
                <PdfHeaderSection titleSection="Problem Description" />
                <PdfContentDetailNg content={detailNg} />
              </View>
            )}

            {additionalCheck.length > 0 && (
              <View style={styles.content__item}>
                <PdfHeaderSection titleSection="Need Spareparts" />
                <PdfContentAdditionalCheck content={additionalCheck} />
              </View>
            )}

            {machineApprovalItems.length > 0 && (
              <View style={styles.content__item}>
                <PdfHeaderSection titleSection="Manager Approval" />
                <PdfContentManagerApproval content={machineApprovalItems} />
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PdfGenerateFile;
