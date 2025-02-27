import { BasePage } from "@pages/BasePage";
import { Page, Locator } from "@playwright/test";

export class OpenHRMLeavePage extends BasePage {
  private leaveTypeDropdown: Locator;
  private fromDateInput: Locator;
  private toDateInput: Locator;
  private reasonInput: Locator;
  private applyButton: Locator;
  // private updateButton: Locator;
  // private cancelButton: Locator;

  private myLeave: Locator;
  private leaveListButton: Locator;
  private addComment: Locator;
  private saveButton: Locator;
  private updatedText: Locator;
  private cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    // this.leaveTypeDropdown = page.locator('select[name="leaveType"]');
    this.leaveTypeDropdown = page.getByText("-- Select --");
    // this.fromDateInput = page.locator('input[name="fromDate"]');
    this.fromDateInput = page.locator("form i").nth(2);
    // this.toDateInput = page.locator('input[name="toDate"]');
    this.toDateInput = page.locator("form i").nth(3);
    // this.reasonInput = page.locator('textarea[name="reason"]');
    this.reasonInput = page.getByPlaceholder("Comment here");
    // this.applyButton = page.locator('button:has-text("Apply")');
    this.applyButton = page.getByRole("button", { name: "Apply" });
    // this.updateButton = page.locator('button:has-text("Update")');
    // this.cancelButton = page.locator('button:has-text("Cancel")');
    this.myLeave = page.getByRole("link", { name: "My Leave" });
    this.leaveListButton = page.getByRole("button", { name: "" });
    this.addComment = page.getByText("Add Comment");
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.updatedText = page.getByText("Family-GG-1");
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
  }

  async applyLeave(
    leaveType: string,
    fromDate: string,
    toDate: string,
    reason: string
  ) {
    await this.leaveTypeDropdown.selectOption({ label: leaveType });
    await this.fillInput(this.fromDateInput, fromDate);
    await this.fillInput(this.toDateInput, toDate);
    await this.fillInput(this.reasonInput, reason);
    await this.clickButton(this.applyButton);
  }

  // async updateLeave(fromDate: string, toDate: string, reason: string) {
  async updateLeave(reason: string) {
    await this.clickButton(this.myLeave);
    await this.clickButton(this.leaveListButton);
    await this.clickButton(this.addComment);
    // await this.fillInput(this.fromDateInput, fromDate);
    // await this.fillInput(this.toDateInput, toDate);
    await this.fillInput(this.reasonInput, reason);
    await this.clickButton(this.saveButton);
  }

  async cancelLeave(fromDate: string) {
    await this.clickButton(this.leaveListButton);
    await this.clickButton(this.cancelButton);

    // await this.fillInput(this.fromDateInput, fromDate);
    // await this.clickButton(this.cancelButton);
  }

  async updatedLeaveComment(): Promise<boolean> {
    return this.updatedText.isVisible();
  }
}
