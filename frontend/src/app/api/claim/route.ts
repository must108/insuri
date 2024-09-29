import { db } from "@/app/lib/db";
import { User, Claim, ClaimStatus } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, type NextRequest } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

type ClaimData = {
  age: number;
  gender: string;
  address: string;
  car_make: string;
  car_model: string;
  car_year: number;
  car_mileage: number;
  insurance_company: string;
  deductible: number;
  premium: number;
  files: File[];
  claims: string; // This is always '0' based on the provided code
};

export type CreateClaimResponse = {
  data: Claim;
  success: boolean;
  error?: string;
};

export async function POST(request: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  console.log(user);

  const formData = await request.formData();

  try {
    const createUser = await db.user.upsert({
      where: {
        id: user.id,
      },
      create: {
        id: user.id,
      },
      update: {
        id: user.id,
      },
    });

    const createClaim = await db.claim.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },

        insurance_company: formData.get("insurance_company")?.toString() || "",
        premium_cost: Number(formData.get("premium")) || 0,
        deductible: Number(formData.get("deductible")) || 0,
        car_make: formData.get("car_make")?.toString() || "",
        car_model: formData.get("car_model")?.toString() || "",
        car_year: Number(formData.get("car_year")) || 0,
        car_mileage: Number(formData.get("car_mileage")) || 0,

        // AI generated data
        claim_amount: Number(formData.get("claim_amount")) || 0,
        deductible_amount: Number(formData.get("deductible_amount")) || 0,
        monthly_premium_increase:
          Number(formData.get("monthly_premium_increase")) || 0,
        repair_cost: Number(formData.get("repair_cost")) || 0,

        // Rest of form data
        otherParty: formData.get("otherParty") === "true",
        otherPartyDescription:
          formData.get("otherPartyDescription")?.toString() || "",
        injured: formData.get("injured") === "true",
        injuredDescription:
          formData.get("injuredDescription")?.toString() || "",
        policeReport: formData.get("policeReport") === "true",
        otherComments: formData.get("otherComments")?.toString() || "",
      },
      include: {
        statusTimeline: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: createClaim
    } as CreateClaimResponse);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
}

export async function GET(request: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const claims = await db.claim.findMany({
    where: {
      userId: user.id,
    },
    include: {
      statusTimeline: true,
    },
  });

  return NextResponse.json({
    data: claims,
  });
}
