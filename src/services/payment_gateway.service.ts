import { db } from "@db";
import { Service } from "typedi";
import { HttpException } from "@exceptions/http.exception";

@Service()
export class payment_gateway_service {
  public async getInformation() {
    try {
      return await db.Payment_gateway.findOne();
    } catch (error) {
      throw error;
    }
  }
  public async changeStatus(Body: any) {
    try {
      const { status, id } = Body;

      if (!["LIVE", "SANDBOX", "OFF"].includes(status)) {
        throw new HttpException(400, "not valid input ");
      }

      const DBres = await db.Payment_gateway.update(
        {
          status: status,
        },
        {
          where: {
            id: id,
          },
        },
      );
      return DBres;
    } catch (error) {
      throw error;
    }
  }
  public async changeInformation(Body: any) {
    try {
      const { store_id, merchant_id, signature_key, id } = Body;

      if (!store_id && !merchant_id && !signature_key) {
        return { msg: "Not update" };
      }

      const updated: any = {};

      if (store_id) {
        updated.store_id = store_id;
      }
      if (merchant_id) {
        updated.merchant_id = merchant_id;
      }
      if (signature_key) {
        updated.signature_key = signature_key;
      }
      const DbRes = await db.Payment_gateway.update(updated, {
        where: {
          id: id,
        },
      });
      return DbRes;
    } catch (error) {
      throw error;
    }
  }
  public async createPaymentInvoice(
    data: {
      name: string;
      amount_original: string;
      cus_email: string;
      store_amount: string;
      currency_merchant: string;
      all_data: Object;
      status: string;
    },
    userID: string,
  ) {
    try {
      const paymentCreate = await db.Payment_Online.create({
        name: data.name,
        amount_original: data.amount_original,
        currency_merchant: data.currency_merchant,
        cus_email: data.cus_email,
        store_amount: data.store_amount,
        all_data: JSON.stringify(data.all_data),
        status: data.status,
        userId: userID,
      });
      return paymentCreate.toJSON();
    } catch (error) {
      throw error;
    }
  }
}
