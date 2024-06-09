"use client";

import { User, Vehicle } from "@/constant/types";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../config/firebase";

export function GetVehicles() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      const unsubscribe = onSnapshot(
        collection(firestore, "users"),
        (snapshot) => {
          console.log("Snapshot size: ", snapshot.size);
          if (snapshot.empty) {
            console.log("No documents found in the 'users' collection.");
            setLoading(false);
            return;
          }

          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          } as User));

          console.log("Fetched users: ", data);

          let vehiclesData: Vehicle[] = [];
          data.forEach((user) => {
            if (user.motocycles && Array.isArray(user.motocycles)) {
              vehiclesData = [...vehiclesData, ...user.motocycles];
            } else {
              console.warn(`User with ID ${user.id} has no vehicles or vehicles is not an array.`);
            }
          });

          setVehicles(vehiclesData);
          console.log(vehiclesData)
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching collection: ", error);
          setError(error);
          setLoading(false);
        }
      );
  
      // Cleanup subscription on unmount
      return () => unsubscribe();
    }, []);
  
    return { vehicles, loading, error };
}
