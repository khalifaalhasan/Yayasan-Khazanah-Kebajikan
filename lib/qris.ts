// lib/qris.ts

/**
 * Menghitung CRC16 (CCITT-FALSE) untuk string QRIS.
 * Ini diperlukan agar QRIS valid dan bisa discan bank.
 */
function crc16(str: string): string {
  let crc = 0xffff;
  const strlen = str.length;

  for (let c = 0; c < strlen; c++) {
    crc ^= str.charCodeAt(c) << 8;
    for (let i = 0; i < 8; i++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }

  let hex = (crc & 0xffff).toString(16).toUpperCase();
  if (hex.length < 4) {
    hex = ("0000" + hex).slice(-4);
  }

  return hex;
}

/**
 * Mengubah QRIS Statis menjadi QRIS Dinamis dengan Nominal.
 * @param qrisRaw String QRIS asli (contoh: "000201010211...")
 * @param nominal Nominal donasi (contoh: 50000)
 * @returns String QRIS baru yang mengandung nominal
 */
export function generateQrisWithNominal(qrisRaw: string, nominal: number): string {
  // 1. Bersihkan QRIS dari CRC lama (4 karakter terakhir) dan ID CRC (6304)
  // Biasanya tag CRC ada di akhir, ID '63', Length '04'.
  // Kita potong string sampai sebelum tag '63'.
  
  // Cari posisi tag 63 (CRC)
  const crcIndex = qrisRaw.lastIndexOf("6304");
  if (crcIndex === -1) return qrisRaw; // Gagal parsing

  let qrisBody = qrisRaw.substring(0, crcIndex);

  // 2. Cek apakah sudah ada tag 54 (Transaction Amount). Jika ada, kita harus menghapusnya dulu.
  // (Ini agak kompleks regex-nya, untuk penyederhanaan kita asumsikan QRIS statis belum punya tag 54)
  // Namun, cara paling aman adalah menyuntikkan tag 54 sebelum tag 58 (Country Code) atau sebelum 53.
  // Standar EMVCo: Tag 54 adalah Transaction Amount.
  
  // Format Tag: ID (2 chars) + Length (2 chars) + Value
  const nominalStr = nominal.toString();
  const nominalLen = nominalStr.length.toString().padStart(2, "0");
  const tag54 = `54${nominalLen}${nominalStr}`;

  // 3. Tambahkan Tag 54 ke dalam body.
  // Posisi aman biasanya sebelum tag 58 (ID), atau jika tidak ketemu, sebelum tag 53 (Currency).
  // Atau sederhananya, tambahkan saja di akhir body sebelum CRC, standar EMVCo cukup fleksibel urutannya.
  // Tapi, beberapa bank strict. Urutan umum: ... -> 53 -> 54 -> 58 -> ...
  
  // Kita coba inject sebelum tag "5802ID" (Country Code Indonesia)
  if (qrisBody.includes("5802ID")) {
      qrisBody = qrisBody.replace("5802ID", `${tag54}5802ID`);
  } else {
      // Fallback: taruh di akhir sebelum CRC
      qrisBody = qrisBody + tag54;
  }

  // 4. Hitung CRC baru
  const stringToCrc = `${qrisBody}6304`;
  const newCrc = crc16(stringToCrc);

  // 5. Gabungkan
  return `${stringToCrc}${newCrc}`;
}