import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import PhoneItem from "./phone-item";

interface BarbershopSummaryProps {
  description?: string | null;
  bio?: string | null;
}

const BarbershopSummary = ({ description, bio }: BarbershopSummaryProps) => {
  return (
    <>
      <div className="relative flex h-[180px] w-full items-end">
        <Image
          alt={`Mapa da barbearia`}
          src="/map.png"
          fill
          className="object-cover"
        />
      </div>

      <Card className="rounded-none py-3">
        <CardContent className="px-2">
          {(description || bio) && (
            <div className="mb-3 space-y-2 border-b border-solid pb-3">
              <h2 className="text-xs font-bold uppercase">
                {description ? "Descrição" : "Bio"}
              </h2>
              <p className="text-justify text-sm hyphens-auto text-gray-400">
                {description ?? bio}
              </p>
            </div>
          )}

          <PhoneItem phone="9988727782" />

          <div className="mt-3 space-y-2 border-t border-solid p-5 text-sm">
            <div className="flex justify-between">
              <p className="text-gray-400">Segunda</p>
              <p>Fechado</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">Terça-Feira</p>
              <p>9:00 - 21:00</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">Quarta-Feira</p>
              <p>9:00 - 21:00</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400"> Quinta-Feira</p>
              <p>9:00 - 21:00</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">Sexta-Feira</p>
              <p>9:00 - 21:00</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">Sábado</p>
              <p>9:00 - 17:00</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">Domingo</p>
              <p>Fechado</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BarbershopSummary;
