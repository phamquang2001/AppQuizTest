// 'use client'
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { archiveAssessment } from "../apiHr";
// const queryClient = useQueryClient();

// export const archiveMutation = useMutation({
//     mutationFn: archiveAssessment,
//     onSuccess: async (data) => {
//       await queryClient.invalidateQueries({ queryKey: ["getDataUnArchive"] });
//       await queryClient.invalidateQueries({ queryKey: ["getDataArchive"] });
//       toast.success(data.data.message);
//     },
//     onError: (data: any) => {
//       toast.error(data.data.message);
//     },
//   });
