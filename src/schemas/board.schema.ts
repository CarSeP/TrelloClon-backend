import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 30,
      trim: true,
    },
    usersID: [
      {
        type: String,
        required: true,
      },
    ],
    columns: [
      {
        id: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
          maxlength: 30,
          trim: true,
        },
        cards: [
          {
            id: {
              type: String,
              required: true,
            },
            title: {
              type: String,
              required: true,
              trim: true,
            },
            description: {
              type: String,
              default: "",
            },
            createdAt: {
              type: {
                date: {
                  type: Date,
                  default: Date.now,
                },
                userID: {
                  type: String,
                  required: true,
                },
              },
              required: true,
            },
            updatedAt: [
              {
                userID: {
                  type: String,
                  required: true,
                },
                date: {
                  type: Date,
                  default: Date.now,
                },
                change: {
                  type: String,
                  enum: ["description", "title", "status", "column"],
                  required: true,
                },
                value: {
                  oldValue: {
                    type: String,
                    required: true,
                  },
                  newValue: {
                    type: String,
                    required: true,
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Board = mongoose.model("board", boardSchema);
